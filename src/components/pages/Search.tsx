import React from 'react'
import { useDebounce } from "use-debounce";
import { getRequest } from '../../axios/axiosClient';
import axios from 'axios';
import { AnimeData, CardInfoTypes } from '../Types/types';
import CardInfo, { formatNumber } from './Card/CardInfo';
import { MdClose } from "@react-icons/all-files/md/MdClose";
import SkeletonSearch from '../Skeleton/SkeletonSearch';
import cat from "../../assets/cat.svg";

function sliceText(text: string, number: number): string {
  if (text.length >= number) {
    return text.slice(0, number) + "...";
  } else {
    return text
  }
}

function InputElement({ inputValue, handleInputChange }: any) {
  return (
    <input type="text" placeholder='Search...' className='py-1 w-full text-xl md:text-2xl lg:text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} />
  )
}

function TopResult({ images, title }: { images: { jpg: { large_image_url: string } }, title: string }) {
  return (
    <div className='cursor-pointer hover:bg-zinc-900 pb-3'>
      <div className='w-full aspect-video'>
        <img src={images.jpg.large_image_url} alt={title} loading='lazy' className='w-full h-full object-cover' />
      </div>
      <h4 className='mt-4 font-medium text-base text-zinc-50'>
        {sliceText(title, 20)}
      </h4>
    </div>
  )
}

function SeriesMovies({ images, title, episodes, score, scored_by }: CardInfoTypes) {
  return (
    <div className='flex items-center cursor-pointer hover:bg-zinc-900'>
      <div className='mr-3 w-[60px] aspect-[2/3] flex-shrink-0'>
        <img src={images.jpg.large_image_url} alt={title} loading='lazy' className='w-full h-full object-cover pointer-events-none' />
      </div>
      <div>
        <h4 className='font-medium text-base text-zinc-50'>
          {sliceText(title, 20)}
        </h4>
        <div className='text-xs text-zinc-400'>{episodes ? episodes : "N/A"} Episodes</div>
        <div className='text-[13px] text-zinc-300 font-semibold mt-3'>
          <div>{score ? score : "NA"} by {scored_by ? `(${formatNumber(scored_by)})` : "N/A"}</div>
        </div>
      </div>
    </div>
  )
}

function RecentSearch({ title }: { title: string }) {
  return (
    <div className='text-xs text-white uppercase bg-zinc-700 flex justify-between cursor-pointer'>
      <div className='py-2 px-2 hover:bg-zinc-600 h-full flex-shrink-0'>
        {sliceText(title, 20)}
      </div>
      <div className='flex items-center cursor-pointer px-2 hover:bg-zinc-600'>
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

  let RECENT_SEARCH = JSON.parse(localStorage.getItem("RECENT_SEARCH")!);

  const addRecentSearch = (mal_id: number, title: string) => {
    let recentSearch: { mal_id: number; title: string }[] = [];
    let object = { mal_id, title }

    if (!localStorage.getItem("RECENT_SEARCH")) {
      recentSearch.push(object);
      localStorage.setItem("RECENT_SEARCH", JSON.stringify(recentSearch))
    } else {
      recentSearch = JSON.parse(localStorage.getItem("RECENT_SEARCH")!);
      recentSearch.push(object);
      localStorage.setItem("RECENT_SEARCH", JSON.stringify(recentSearch));
    }
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

  return (
    <>
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
                        <div className='relative group overflow-hidden cursor-pointer' key={key} onClick={() => addRecentSearch(mal_id, title)}>
                          <TopResult images={images} title={title} />
                          <CardInfo images={images} score={score} scored_by={scored_by} synopsis={synopsis} episodes={episodes} title={title} />
                        </div>
                      ).slice(0, 3)}
                    </div>
                  </div>
                  <div className='mb-16'>
                    <h2 className='text-2xl font-medium text-white'>Series</h2>
                    <div className='my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {animeData && animeData.filter((el) => el.type === "TV" && el.status !== "Not yet aired").map(({ images, title, episodes, score, scored_by }, key) =>
                        <SeriesMovies images={images} title={title} episodes={episodes} score={score} scored_by={scored_by} key={key} />
                      )}
                    </div>
                  </div>
                  <div className='mb-16'>
                    <h2 className='text-2xl font-medium text-white'>Moives</h2>
                    <div className='my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {animeData && animeData.filter((el) => el.type === "Movie" && el.status !== "Not yet aired").map(({ images, title, episodes, score, scored_by }, key) =>
                        <SeriesMovies images={images} title={title} episodes={episodes} score={score} scored_by={scored_by} key={key} />
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
          <div className='flex flex-wrap flex-col min-[500px]:flex-row gap-2'>
            {RECENT_SEARCH.map(({ title }: any, key: number) =>
              <RecentSearch title={title} key={key} />
            )}
          </div>
        </div>
      }
    </>
  )
}

export default Search