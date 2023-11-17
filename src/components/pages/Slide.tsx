import React, { Suspense } from 'react'
import SlideContainer, { SlideContainerType } from './SlideContainer'

function Slide() {
  const slideData: SlideContainerType[] = [
    {
      api: `seasons/now?filter=tv&page=1`,
      header: "Season 2023 Latest Simulcasts",
      paragraph: "Explore the Best New Releases & Ongoing Simulcasts!",
    },
    {
      api: `top/anime?type=tv&filter=bypopularity`,
      header: "Anime Watch Recommendations",
      paragraph: "Discover the top picks for new and ongoing series here!",
    }
  ];

  const api = `seasons/now?filter=tv&page=1`;
  const header = "Season 2023 Latest Simulcasts"
  const paragraph = "Explore the Best New Releases & Ongoing Simulcasts!";

  return (
    <SlideContainer api={slideData[0].api} header={slideData[0].header} paragraph={slideData[0].paragraph} />
  )
}

export default Slide