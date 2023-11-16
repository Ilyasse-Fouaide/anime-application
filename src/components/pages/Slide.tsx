import _React from 'react'
import SlideContainer from './SlideContainer'

function Slide() {
  const api = `https://api.jikan.moe/v4/seasons/now?filter=tv`
  const header = "Season 2023 Latest Simulcasts"
  const paragraph = "Explore the Best New Releases & Ongoing Simulcasts!"

  return (
    <>
      <SlideContainer api={api} header={header} paragraph={paragraph} />
    </>
  )
}

export default Slide