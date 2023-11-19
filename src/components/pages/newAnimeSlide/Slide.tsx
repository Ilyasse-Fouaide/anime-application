import React from 'react';
import SlideContainer, { SlideContainerType } from '../SlideContainer'

function Slide() {
  const [show, isShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      isShow(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [])

  const slideData: SlideContainerType[] = [
    {
      api: `seasons/now?filter=tv&page=1`,
      header: "Season 2023 Latest Simulcasts",
      paragraph: "Explore the Best New Releases & Ongoing Simulcasts!",
    },
    {
      api: `seasons/2022/fall?filter=tv`,
      header: "Anime Watch Recommendations",
      paragraph: "Discover the top picks the popular series here!",
    },
  ];

  return (
    <>
      {slideData.map(({ api, header, paragraph }, key) =>
        <div key={key}>
          <SlideContainer api={api} header={header} paragraph={paragraph} key={key} />
        </div>
      )}
    </>
  )
}

export default Slide