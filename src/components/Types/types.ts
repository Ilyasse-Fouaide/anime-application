export interface Trailer {
  trailer?: {
    images: { maximum_image_url: string }
  }
}

export interface CardInfoTypes {
  images: {
    jpg: {
      large_image_url: string
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
  themes: {
    name: string
  }[],
}

export interface GenresType {
  name: string,
  count: number,
}

export interface AnimeData extends Trailer, CardTypes {
  genres: GenresType[],
  duration: string,
}
