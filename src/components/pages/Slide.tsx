import _React from 'react'
import SlideContainer, { SlideContainerType } from './SlideContainer'

function Slide() {
  const slideData: SlideContainerType[] = [
    {
      api: `https://api.jikan.moe/v4/seasons/now?filter=tv&page=1`,
      header: "Season 2023 Latest Simulcasts",
      paragraph: "Explore the Best New Releases & Ongoing Simulcasts!",
    },
    {
      api: `https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity`,
      header: "Anime Watch Recommendations",
      paragraph: "Discover the top picks for new and ongoing series here!",
    }
  ];

  return (
    <>
      {slideData.map(({ api, header, paragraph }, key) =>
        <SlideContainer api={api} header={header} paragraph={paragraph} key={key} />
      )}
    </>
  )
}

export default Slide