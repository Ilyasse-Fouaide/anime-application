import React from 'react'
import { useDebounce } from "use-debounce";
import { getRequest } from '../../../axios/axiosClient';
import axios from 'axios';
import { AnimeData } from '../../Types/types';
import CardInfo from '../Card/CardInfo';
import { MdClose } from "@react-icons/all-files/md/MdClose";
import SkeletonSearch from '../../Skeleton/SkeletonSearch';
import cat from "../../../assets/cat.svg";
import { Link } from 'react-router-dom';
import SeriesMovies from './SeriesMovies';
import TopResult from './TopResult';
import { sliceText } from '../../functions/sliceText';
import { slug } from '../../functions/slug';

function InputElement({ inputValue, handleInputChange }: any) {
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [])

  return (
    <input type="text" placeholder='Search...' className='py-1 w-full text-xl md:text-2xl lg:text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} ref={ref} />
  )
}

function RecentSearch({ mal_id, title, removeItem }: { mal_id: number, title: string, removeItem: (mal_id: number) => void }) {

  return (
    <div className='text-xs text-white uppercase bg-zinc-700 flex justify-between cursor-pointer'>
      <Link to={`/series/${mal_id}/${slug(title)}`} className='py-2 px-2 hover:bg-zinc-600 h-full flex-shrink-0'>
        {sliceText(title, 20)}
      </Link>
      <div className='flex items-center cursor-pointer px-1 hover:bg-zinc-600' onClick={() => removeItem(mal_id)}>
        <MdClose className="w-[20px] h-[20px]" />
      </div>
    </div>
  )
}

function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [debouncedValue] = useDebounce(inputValue, 1000);
  const [recentSearchData, setRecentSearchData] = React.useState([]);

  const fetchRecentSearch = () => {
    let RECENT_SEARCHES = JSON.parse(localStorage.getItem("RECENT_SEARCHES")!);
    setRecentSearchData(RECENT_SEARCHES);
  }

  const addRecentSearch = (mal_id: number, title: string) => {
    let recentSearch: { mal_id: number; title: string }[] = [];
    let object = { mal_id, title }

    if (!localStorage.getItem("RECENT_SEARCHES")) {
      recentSearch.push(object);
      localStorage.setItem("RECENT_SEARCHES", JSON.stringify(recentSearch))
    } else {
      recentSearch = JSON.parse(localStorage.getItem("RECENT_SEARCHES")!);
      recentSearch.push(object);
      localStorage.setItem("RECENT_SEARCHES", JSON.stringify(recentSearch));
    }
    fetchRecentSearch();
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  React.useEffect(() => {
    if (debouncedValue !== "") {
      let cancelToken;
      cancelToken = axios.CancelToken.source();
      getRequest(`anime?q=${debouncedValue}&order_by=popularity&sfw=true`, cancelToken.token)
        .then(({ data }) => {
          setLoading(false);
          setAnimeData(data.data);
        });
    } else {
      setLoading(true)
      setAnimeData([]);
    }
  }, [debouncedValue]);

  React.useEffect(() => {
    fetchRecentSearch();
  }, []);

  const removeItem = (mal_id: number) => {
    let recentSearch: any = JSON.parse(localStorage.getItem('RECENT_SEARCHES')!)
    const index = recentSearch.findIndex((el: any) => el.mal_id === mal_id);
    if (index !== -1) {
      recentSearch.splice(index, 1);
      localStorage.setItem("RECENT_SEARCHES", JSON.stringify(recentSearch));
      fetchRecentSearch();
    };
  };

  const clearRecentSearch = () => {
    localStorage.removeItem("RECENT_SEARCHES");
    fetchRecentSearch();
  }

  return (
    <div className='mb-[135px]'>
      <div className='bg-zinc-900'>
        <div className='max-w-[950px] mx-auto'>
          <div className='px-6 py-6 md:py-8 lg:py-10 lg:px-14'>
            <div className="relative">
              <InputElement inputValue={inputValue} handleInputChange={handleInputChange} />
              {debouncedValue &&
                <div className='absolute top-1/2 -translate-y-1/2 right-0 p-3 cursor-pointer group' onClick={() => setInputValue("")}>
                  <MdClose className="w-[30px] h-[30px] text-zinc-300 group-hover:text-white" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {debouncedValue !== "" ?
        <>
          {loading ?
            <div className='max-w-[950px] mx-auto py-10 px-6 lg:px-0'>
              <SkeletonSearch />
            </div>
            :
            <div className='max-w-[950px] mx-auto py-10 px-6 lg:px-0'>
              {animeData.length === 0 ?
                <div className='border border-dashed flex flex-col items-center space-y-5 p-5'>
                  <div className='w-[250px] h-[250px]'>
                    <img src={cat} alt="CAT" className='w-full h-full pointer-events-none' />
                  </div>
                  <div className='max-w-md text-center'>
                    <div className='text-sm font-medium'>We couldn't find any results matching your search. Please try again or explore other options.</div>
                  </div>
                </div>
                :
                <>
                  <div className='mb-16'>
                    <h2 className='text-2xl font-medium text-white'>Top Results</h2>
                    <div className='my-3 grid grid-cols-2 md:grid-cols-3 gap-3'>
                      {animeData && animeData.filter((el) => el.type === "TV" && el.status !== "Not yet aired").map(({ mal_id, images, title, score, scored_by, synopsis, episodes }, key) =>
                        <Link to={`/series/${mal_id}/${slug(title)}`} className='relative group overflow-hidden cursor-pointer' key={key} onClick={() => addRecentSearch(mal_id, title)}>
                          <TopResult images={images} title={title} />
                          <CardInfo images={images} score={score} scored_by={scored_by} synopsis={synopsis} episodes={episodes} title={title} slice={75} />
                        </Link>
                      ).slice(0, 3)}
                    </div>
                  </div>
                  <div className='mb-16'>
                    <h2 className='text-2xl font-medium text-white'>Series</h2>
                    <div className='my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {animeData && animeData.filter((el) => el.type === "TV" && el.status !== "Not yet aired").map(({ mal_id, images, title, episodes, score, scored_by }, key) =>
                        <Link to={`/series/${mal_id}/${title.split(" ").join("-")}`} onClick={() => addRecentSearch(mal_id, title)} key={key} >
                          <SeriesMovies images={images} title={title} episodes={episodes} score={score} scored_by={scored_by} synopsis={''} />
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className='mb-16'>
                    <h2 className='text-2xl font-medium text-white'>Moives</h2>
                    <div className='my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {animeData && animeData.filter((el) => el.type === "Movie" && el.status !== "Not yet aired").map(({ mal_id, images, title, episodes, score, scored_by }, key) =>
                        <Link to={`/series/${mal_id}/${title.split(" ").join("-")}`} onClick={() => addRecentSearch(mal_id, title)} key={key} >
                          <SeriesMovies images={images} title={title} episodes={episodes} score={score} scored_by={scored_by} synopsis={''} />
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              }
            </div>
          }
        </>
        :
        <div className='max-w-[950px] mx-auto py-10 px-6 lg:px-0'>
          {!recentSearchData || recentSearchData.length === 0 ?
            <div className='py-[27px] border border-dashed border-white'>
              <div className='text-center text-base md:text-xl font-medium text-white'>Search for Anime you like to watch</div>
            </div>
            :
            <>
              <div className='flex items-end justify-between'>
                <h2 className='text-base md:text-xl font-medium text-white'>Recent Search Results</h2>
                <div className='text-sm lg:text-base font-semibold transition-colors text-zinc-400 hover:text-zinc-50 cursor-pointer' onClick={clearRecentSearch}>CLEAR</div>
              </div>
              <div className='my-3 flex flex-wrap flex-col min-[500px]:flex-row gap-2'>
                {recentSearchData && recentSearchData.map(({ mal_id, title }: any, key: number) =>
                  <div key={key}>
                    <RecentSearch mal_id={mal_id} title={title} removeItem={removeItem} />
                  </div>
                )}
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}

export default Search