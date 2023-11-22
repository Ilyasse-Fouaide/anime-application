export interface Trailer {
  trailer?: {
    images: { maximum_image_url: string }
  }
}

export interface CardInfoTypes {
  images: {
    jpg: {
      large_image_url: string,
      small_image_url: string
    }
  },
  score: number,
  scored_by: number,
  synopsis: string,
  episodes: number,
  title: string,
}

export interface CardTypes extends CardInfoTypes {
  type: string,
  status: string
}

export interface GenresType {
  mal_id: number
  name: string,
  count: number,
}

export interface AnimeData extends Trailer, CardTypes {
  mal_id: number,
  genres: GenresType[],
  duration: string,
  status: string
}
