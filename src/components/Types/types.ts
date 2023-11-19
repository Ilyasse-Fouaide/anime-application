export interface Trailer {
  trailer?: {
    images: { maximum_image_url: string }
  }
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

export interface AnimeData extends Trailer, Card {
  genres: {
    name: string,
  }[],
  duration: string,
}
