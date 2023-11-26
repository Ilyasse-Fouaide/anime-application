import { Link } from 'react-router-dom'

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
            to={`/series/${mal_id}/${name.split(" ").join("-")}`}
            key={key}
            className={`uppercase text-[14px] font-medium ${name ? "text-zinc-400" : "text-zinc-600"} hover:text-white`}
          >
            {text}
          </Link>
        )}
      </div>
    )
  }
}


export default Relation