import React from "react"
import "../styles/bulma.scss";
import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import SEO from '../components/seo';
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

      <div className="columns">
        <div className="column">
          <h1 className="title is-1">コロナ重症者数</h1>
          <h2 className="subtitle is-4">{"更新日: " + formatDate(latestDate)}</h2>
          <ParentSize>
            {parent => (
              <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 700, simpleData, 'green', 'black', tickFormat)} />
            )}
          </ParentSize>
        </div>
      </div>
      <footer className="footer">
        <div class="content">
          <h2 className="subtitle is-4">データソース</h2>
          <ul type="1">
            <li><a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html" className="href">厚生労働省報道資料</a></li>
            <li><a href="https://www.stopcovid19.jp/" className="href">stopcovid19.jp</a>提供の<a href="https://www.stopcovid19.jp/data/covid19japan-all.json" className="href">API</a>を利用させていただいております</li>
            
            </ul>
        </div>
      </footer>
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