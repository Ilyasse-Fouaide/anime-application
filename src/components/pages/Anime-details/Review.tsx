import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { IoStarHalf } from '@react-icons/all-files/io5/IoStarHalf';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
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
      {reviews && reviews.map(({ user, date, tags, review }, key) =>
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
          </div>
        </div>
      ).slice(0, 4)}
    </div>
  )
}

export default Review