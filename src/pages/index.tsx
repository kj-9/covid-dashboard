import React from "react"
import "../styles/bulma.scss";
import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import SEO from '../components/seo';
import { SimpleDataType } from '../components/simpleData';
import { ParentSize } from '@vx/responsive';
import { graphql } from 'gatsby';

const tickFormat = (y: string) => y;

export default function Home({ data }) {

  const rawData = data.transformedData.data.patient

  const simpleData: SimpleDataType[] = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_nheavycurrentpatients }));


  return (
    <div>
      <SEO />
      <div className="columns">
        <div className="column">
          <h1 className="title is-1">コロナ重症者数</h1>
          <h2 className="subtitle is-4">都道府県別</h2>
          <ParentSize>
            {parent => (
              <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 700, simpleData, 'green', 'black', tickFormat)} />
            )}
          </ParentSize>
        </div>
      </div>
    </div>

  )
}


export const pageQuery = graphql`
query HomePageQuery {
  transformedData {
    data {
      patient {
        srcurl_web
        description
        lastUpdate
        npatients
        nexits
        ndeaths
        ncurrentpatients
        pref_name
        pref_name_jp
        pref_npatients
        pref_ncurrentpatients
        pref_nheavycurrentpatients
        pref_nexits
        pref_ndeaths
        pref_nunknowns
        pref_ninspections
      }
    }
  }
}
`