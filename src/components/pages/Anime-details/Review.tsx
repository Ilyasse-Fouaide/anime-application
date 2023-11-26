import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { IoStarHalf } from '@react-icons/all-files/io5/IoStarHalf';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { AiFillLike } from '@react-icons/all-files/ai/AiFillLike';
import { sliceText } from '../../functions/sliceText';

function Review() {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const { id } = useParams();

  React.useEffect(() => {
    getRequest(`anime/${id}/reviews`)
      .then(({ data }) => {
        // console.log({ data })
        setReviews(data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return "Loadding..."
  }

  if (error) {
    return "Error"
  }

  return (
    <div>
      {reviews && reviews.map(({ user, date, tags, review, reactions }, key) =>
        <div className='my-10 flex gap-6' key={key}>
          <div>
            <div className='w-[62px] aspect-square ring ring-[var(--red)] ring-offset-black ring-offset-4 rounded-full'>
              <img src={user.images.webp.image_url} className='w-full h-full object-cover rounded-full' alt={user.username} />
            </div>
          </div>
          <div className='w-full'>
            <div className='text-[15px] font-medium flex items-center gap-2'>
              <span className='text-white'>{user.username}</span>
              <span className='text-zinc-400 text-[13px]'>{`${moment(date).format("DD MMMM YYYY")}`}</span>
            </div>
            <div className='my-3 flex gap-2 text-[11px] font-medium'>
              {tags.map((tag, key) =>
                <div className={`px-1 bg-zinc-800 ${tag === "Recommended" ? "text-green-400" : tag === "Not Recommended" ? "text-red-400" : "text-zinc-300"} flex items-center h-[20px]`} key={key}>
                  {tag === "Recommended" && <IoStar className="mr-1 text-[13px]" />}
                  {tag === "Not Recommended" && <IoStarOutline className="mr-1 text-[13px]" />}
                  {tag === "Mixed Feelings" && <IoStarHalf className="mr-1 text-[13px]" />}
                  {tag}
                </div>
              )}
            </div>
            <p className='text-white font-medium text-[14px]'>{sliceText(review, 250)}</p>
            <div className='mt-5 pt-5 border-t border-zinc-700 flex items-center gap-1'>
              <div className='flex items-center -space-x-[3px]'>
                <div className='bg-blue-500 rounded-full flex items-center justify-center p-1 ring-4 ring-zinc-950'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                  </svg>
                </div>
                <div className='bg-red-500 rounded-full flex items-center justify-center p-1 ring-4 ring-zinc-950'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              </div>
              <div className='text-[12px] font-semibold text-white'>{reactions.overall}</div>
            </div>
          </div>
        </div>
      ).slice(0, 4)}
    </div>
  )
}

export default Review