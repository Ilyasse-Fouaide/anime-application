import React from 'react'
import { useDebounce } from "use-debounce";
import { getRequest } from '../../axios/axiosClient';
import axios from 'axios';
import { AnimeData } from '../Types/types';
import { formatNumber } from './Card/CardInfo';

function InputElement({ inputValue, handleInputChange }: any) {
  return (
    <input type="text" placeholder='Search...' className='py-1 w-full text-xl md:text-2xl lg:text-3xl font-semibold bg-transparent border-b-2 transition-colors border-b-zinc-600 focus:border-b-[var(--red)] outline-none' value={inputValue} onChange={handleInputChange} />
  )
}


function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [debouncedValue] = useDebounce(inputValue, 1000);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  }

  React.useEffect(() => {
    if (debouncedValue !== "") {
      let cancelToken;
      cancelToken = axios.CancelToken.source();
      getRequest(`anime?q=${debouncedValue}&order_by=popularity`, cancelToken.token)
        .then(({ data }) => {
          setLoading(false);
          setAnimeData(data.data);
        });
    }
  }, [debouncedValue]);

  return (
    <>
      <div className='bg-zinc-900'>
        <div className='max-w-[950px] mx-auto'>
          <div className='px-6 py-6 md:py-8 lg:py-10 lg:px-14'>
            <InputElement inputValue={inputValue} handleInputChange={handleInputChange} />
          </div>
        </div>
      </div>
      {debouncedValue !== "" &&
        <>
          {loading ? "Loading" :
            <div className='max-w-[950px] mx-auto py-10 px-6 lg:px-0'>
              <div>
                <h2 className='text-xl font-medium text-zinc-50'>Series</h2>
                <div className='mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {animeData && animeData.filter((el) => el.type === "TV" && el.status !== "Not yet aired").map(({ images, title, episodes, score, scored_by }, key) =>
                    <div className='flex items-center cursor-pointer hover:bg-zinc-900' key={key}>
                      <div className='mr-3 w-[60px] h-full flex-shrink-0'>
                        <img src={images.jpg.large_image_url} alt={title} className='w-full h-full object-cover pointer-events-none' />
                      </div>
                      <div>
                        <h4 className='font-medium text-base text-white'>
                          {title.length >= 20 ?
                            <>
                              {title.slice(0, 20)}...
                            </>
                            :
                            title
                          }
                        </h4>
                        <div className='text-xs text-zinc-400'>{episodes ? episodes : "N/A"} Episodes</div>
                        <div className='text-[13px] text-zinc-300 font-semibold mt-3'>
                          <div>{score ? score : "NA"} by {scored_by ? `(${formatNumber(scored_by)})` : "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

export default Search