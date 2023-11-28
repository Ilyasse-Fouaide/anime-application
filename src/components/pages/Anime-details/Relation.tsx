import { Link } from 'react-router-dom'
import { slug } from '../../functions/slug'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

interface Relation {
  relation: string,
  entry: {
    mal_id: number,
    name: string
  }[]
}

function Relation({ relation, entry, text, rel }: Relation & { text: string, rel: string }) {
  if (relation === rel) {
    return (
      <div>
        {entry.map(({ mal_id, name }, key) =>
          <Link
            to={`/series/${mal_id}/${slug(name)}`}
            key={key}
            className={`uppercase text-[14px] font-medium ${name ? "text-zinc-400" : "text-zinc-600"} hover:text-white`}
          >
            <span className='hidden sm:block'>
              {text}
            </span>
            <span className='block sm:hidden text-[26px]'>
              {rel === "Prequel" &&
                <IoIosArrowBack />
              }
              {rel === "Sequel" &&
                <IoIosArrowForward />
              }
            </span>
          </Link>
        )}
      </div>
    )
  }
}


export default Relation