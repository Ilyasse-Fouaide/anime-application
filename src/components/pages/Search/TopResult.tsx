import { sliceText } from "./Search";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface TopResult {
  images: {
    jpg: {
      large_image_url: string,
      small_image_url: string
    }
  },
  title: string
}

function TopResult({ images, title }: TopResult) {
  return (
    <div className='cursor-pointer hover:bg-zinc-900 pb-3'>
      <div className='w-full aspect-video'>
        <LazyLoadImage
          src={images.jpg.large_image_url}
          placeholderSrc={images.jpg.small_image_url}
          effect="blur"
          alt={title}
          className="w-full aspect-video object-cover pointer-events-none"
        />
      </div>
      <h4 className='mt-4 font-medium text-base text-zinc-50'>
        {sliceText(title, 20)}
      </h4>
    </div>
  )
}

export default TopResult;