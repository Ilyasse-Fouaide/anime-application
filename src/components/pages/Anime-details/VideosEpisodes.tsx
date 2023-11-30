import React from "react"
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../../axios/axiosClient";
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { sliceText } from "../../functions/sliceText";
import cat from "../../../assets/cat.svg";
import SeketonVideos from "../../Skeleton/SeketonVideos";

export default function VideosEpisodes() {
  const [animeVideo, setAnimeVideo] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [detail, setDetail] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { id, title: slug } = useParams();

  React.useEffect(() => {
    setAnimeVideo([]);
    setLoading(true);
    setError(false);
  }, [id]);

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
  }, []);

  if (loading) {
    return <SeketonVideos />;
  }

  if (error) {
    return "Error"
  }

  const handleClick = () => {
    const video = document.getElementById("video");
    setDetail(!detail)
    if (!detail) {
      video?.scrollIntoView({ behavior: "instant" });
    }
  }

  if (animeVideo.episodes.length === 0 && !error && !loading) {
    return (
      <div className='mt-16 border border-dashed flex flex-col items-center space-y-5 p-5'>
        <div className='w-[250px] h-[250px]'>
          <img src={cat} alt="CAT" className='w-full h-full pointer-events-none' />
        </div>
        <div className='max-w-md text-center'>
          <div className='text-sm font-medium'>We couldn't find any videos episodes available. Check back later or explore other content</div>
        </div>
      </div>
    )
  }

  const twelveEP = animeVideo.episodes.length > 12;

  return (
    <div className="relative">
      <div id="video" className={`mt-16 overflow-y-hidden duration-1000`} style={{ height: detail && twelveEP ? "650px" : "auto" }}>
        <div className='mb-6'>
          <h3 className='text-white text-lg font-semibold'>Videos Episodes</h3>
        </div>
        <div className='grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[580px]:gap-5 lg:gap-6'>
          {animeVideo && animeVideo.episodes.map(({ mal_id, images, title, episode }: { mal_id: number, images: { jpg: { image_url: string } }, title: string, episode: string }, key: number) =>
            <Link to={`/episode/${mal_id}/video`} className='w-full flex flex-row min-[580px]:flex-col cursor-pointer' key={key}>
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
                <div className='text-xs text-zinc-400'>{sliceText(slug!, 26)}</div>
                <span className='text-[13px] min-[580px]:text-[14px] text-white'>
                  EP {episode.split("Episode")[1]} - {window.innerWidth <= 527 ? sliceText(title, 13) : sliceText(title, 22)}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
      {detail && twelveEP && <div className='absolute bottom-0 right-0 left-0 h-[300px] bg-gradient-to-t from-zinc-950'></div>}
      <div className='mt-4 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
        {twelveEP &&
          <>
            {detail ? "MORE EPISODES" : "LESS EPISODES"}
          </>
        }
      </div>
    </div>
  )
}