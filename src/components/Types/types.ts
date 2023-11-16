export interface Trailer {
  trailer?: {
    images: { maximum_image_url: string }
  }
}

export interface AnimeData extends Trailer {
  title: string,
  genres: {
    name: string,
  }[],
  synopsis: string,
  type: string,
  duration: string,
  images: {
    jpg: {
      large_image_url: string
    }
  },
  themes: {
    name: string | null
  }[]
}
