import React from "react"
import { useParams } from "react-router-dom";
import { getRequest } from "../../../axios/axiosClient";
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { sliceText } from "../../functions/sliceText";
import cat from "../../../assets/cat.svg";

export default function Episode() {
  const [animeVideo, setAnimeVideo] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [detail, setDetail] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { id, title: slug } = useParams();

  React.useEffect(() => {
    const getEpisodes = () => {
      getRequest(`anime/${id}/videos`)
        .then(({ data }) => {
          setAnimeVideo(data.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
          setError(true)
        })
    }

    getEpisodes();
  }, [id]);

  if (loading) {
    return "loading ...";
  }

  const handleClick = () => {
    setDetail(!detail)
  }

  if (animeVideo.episodes.length === 0 && !error) {
    return (
      <div className='mt-16 border border-dashed flex flex-col items-center space-y-5 p-5'>
        <div className='w-[250px] h-[250px]'>
          <img src={cat} alt="CAT" className='w-full h-full pointer-events-none' />
        </div>
        <div className='max-w-md text-center'>
          <div className='text-sm font-medium'>We couldn't find any available. Check back later or explore other content</div>
        </div>
      </div>
    )
  }

  const twelveEP = animeVideo.episodes.length > 12;

  return (
    <>
      <div className={`relative mt-16 overflow-y-hidden duration-1000`} style={{ height: detail && twelveEP ? "650px" : "auto" }}>
        <div className='grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[580px]:gap-5 lg:gap-6'>
          {animeVideo && animeVideo.episodes.map(({ images, title, episode }: { images: { jpg: { image_url: string } }, title: string, episode: string }, key: number) =>
            <div className='w-full flex flex-row min-[580px]:flex-col cursor-pointer' key={key}>
              {images.jpg.image_url ?
                <div className='relative flex-shrink-0 w-[50%] min-[580px]:w-full mr-3 aspect-video'>
                  <img src={images.jpg.image_url} className='w-full h-full' alt={title} />
                  <div className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-zinc-950/50 flex items-center justify-center rounded-full'>
                    <IoIosPlay className="text-white w-[35px] h-[35px] md:w-[45px] md:h-[45px] -mr-[5px]" />
                  </div>
                </div>
                :
                <div className='flex-shrink-0 w-[50%] min-[580px]:w-full mr-3 aspect-video bg-zinc-800 flex items-center justify-center'>
                  <IoIosPlay className="text-zinc-500 w-[45px] h-[45px]" />
                </div>
              }
              <div className='mt-0 min-[580px]:mt-3 font-medium text-white'>
                <div className='text-xs text-zinc-400'>{slug}</div>
                <span className='text-[13px] min-[580px]:text-[14px] text-white'>{episode} - {sliceText(title, 22)}</span>
              </div>
            </div>
          )}
        </div>
        {detail && twelveEP && <div className='absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-zinc-950'></div>}
      </div>
      <div className='mt-4 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
        {twelveEP &&
          <>
            {detail ? "MORE EPISODES" : "LESS EPISODES"}
          </>
        }
      </div>
      {error && "Error"}
    </>
  )
}