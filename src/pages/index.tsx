import React from "react"
import "../styles/bulma.scss";
import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import SEO from '../components/seo';
import Footer from '../components/footer';

import { SimpleDataType } from '../components/simpleData';
import { ParentSize } from '@vx/responsive';
import { graphql } from 'gatsby';
import { descending } from 'd3-array';
import { timeFormat } from 'd3-time-format';


const tickFormat = (y: string) => y;
const formatDate = timeFormat("%Y/%m/%d");


export default function Home({ data }) {

  const rawData = data.transformedData.data.latestCovidPatient.data;
  const latestDate = new Date(data.transformedData.data.latestCovidPatient.latestDate);

  const simpleData: SimpleDataType[] = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_nheavycurrentpatients }))
    .sort((a, b) => descending(a.y, b.y));



  return (
    <div>
      <SEO />
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">コロナ感染状況ダッシュボード</h1>
            <h2 className="subtitle">Japan Covid-19 dashboard</h2>
          </div>
        </div>
      </section>
      <div className="columns is-centered has-background-light">
        <div className="column is-four-fifths">
          <h1 className="title is-3">重症者数</h1>
          <h2 className="subtitle is-6">{formatDate(latestDate) + "更新"}</h2>
          <ParentSize>
            {parent => (
              <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 700, simpleData, 'green', 'black', tickFormat)} />
            )}
          </ParentSize>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export const pageQuery = graphql`
query HomePageQuery {
transformedData {
    data {
      latestCovidPatient {
        latestDate
        data {
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
}
`