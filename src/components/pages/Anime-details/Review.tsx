import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { IoStarHalf } from '@react-icons/all-files/io5/IoStarHalf';
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline';
import ShowMoreText from "react-show-more-text";
import { formatNumber } from '../Card/CardInfo';
import { ReviewTypes } from '../../Types/types';
import SkeletonReview from '../../Skeleton/SkeletonReview';

function List({ user, date, tags, review, reactions }: ReviewTypes) {
  return (
    <div className='my-10 flex gap-3 sm:gap-5 lg:gap-6'>
      <div>
        <div className='w-[24px] sm:w-[46px] lg:w-[62px] aspect-square ring-2 md:ring ring-[var(--red)] ring-offset-black ring-offset-2 md:ring-offset-4 rounded-full'>
          <img src={user.images.webp.image_url} className='w-full h-full object-cover rounded-full' alt={user.username} />
        </div>
      </div>
      <div className='w-full'>
        <div className='font-medium flex items-center flex-wrap gap-1 sm:gap-2'>
          <span className='text-white text-[13px] md:text-[15px]'>{user.username}</span>
          <span className='text-zinc-400 text-xs md:text-sm'>{`${moment(date).format("DD MMMM YYYY")}`}</span>
        </div>
        <div className='my-3 flex flex-wrap gap-2 text-[11px] font-medium'>
          {tags.map((tag, key) =>
            <div className={`px-1 bg-zinc-800 ${tag === "Recommended" ? "text-green-400" : tag === "Not Recommended" ? "text-red-400" : "text-zinc-300"} flex items-center h-[20px]`} key={key}>
              {tag === "Recommended" && <IoStar className="mr-1 text-[13px]" />}
              {tag === "Not Recommended" && <IoStarOutline className="mr-1 text-[13px]" />}
              {tag === "Mixed Feelings" && <IoStarHalf className="mr-1 text-[13px]" />}
              {tag}
            </div>
          )}
        </div>
        <div className=''>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
            className="text-white font-medium text-xs text-[14px]"
          >
            {review.split('\n').map((paragraph, index) => (
              <p key={index} className='my-4'>{paragraph}</p>
            ))}
          </ShowMoreText>
        </div>
        <div className='mt-5'>
          <div className='text-xs font-semibold text-zinc-400'>{formatNumber(reactions.overall)} people Like this review</div>
        </div>
      </div>
    </div>
  )
}

function Review() {
  const [reviews, setReviews] = React.useState<ReviewTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [more, setMore] = React.useState<number>(4);
  const { id } = useParams();

  React.useEffect(() => {
    setReviews([]);
    setLoading(true);
    setError(false);
  }, [id]);

  React.useEffect(() => {
    getRequest(`anime/${id}/reviews`)
      .then(({ data }) => {
        setReviews(data.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleMoreClick = () => {
    setMore((prev) => prev + 4);
  }

  const handleLessClick = () => {
    setMore((prev) => prev - 4);
  }

  if (loading) {
    return <SkeletonReview />
  }

  if (error) {
    return "Error"
  }

  if (reviews.length === 0) {
    return (
      <div className='text-center text-sm text-white font-medium py-5 border border-dashed w-full'>
        No reviews found for this content.
      </div>
    )
  }


  return (
    <div>
      <div className='mt-10'>
        <div className='text-lg font-semibold font-white underline'>{reviews.length} Reviews</div>
      </div>
      {reviews && reviews.map(({ user, date, tags, review, reactions }, key) =>
        <List user={user} date={date} tags={tags} review={review} reactions={reactions} key={key} />
      ).slice(0, more)}
      <div className='flex items-center flex-wrap gap-3'>
        <button className='inline-block py-[8px] px-[15px] bg-zinc-950 border-2 border-[var(--red)] text-sm md:text-base text-[var(--red)] hover:text-orange-400 hover:border-orange-400 font-semibold cursor-pointer disabled:border-zinc-500 disabled:text-zinc-500 disabled:cursor-not-allowed' onClick={handleMoreClick} disabled={more === reviews.length}>Load More</button>
        <button className='inline-block py-[8px] px-[15px] bg-zinc-950 border-2 border-[var(--red)] text-sm md:text-base text-[var(--red)] hover:text-orange-400 hover:border-orange-400 font-semibold cursor-pointer disabled:border-zinc-500 disabled:text-zinc-500 disabled:cursor-not-allowed' onClick={handleLessClick} disabled={more <= 4}>Load Less</button>
      </div>
    </div>
  )
}

export default Review