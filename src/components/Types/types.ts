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
    name: string
  }[],
  episodes: number,
  score: number,
  scored_by: number
}

export interface CardInfo {
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

export interface Card extends CardInfo {
  type: string,
  themes: {
    name: string
  }[],
}
