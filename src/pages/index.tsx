import React from "react"
import "../styles/bulma.scss";
import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import { SimpleDataType } from '../components/simpleData';
import { ParentSize } from '@vx/responsive';
import { graphql } from 'gatsby';


export const pageQuery = graphql`
  query HomePageQuery {
    allFile {
      edges {
        node {
          fields {
              data {
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
  }
`

const tickFormat = (y: string) => y;

export default function Home({ data }) {
  const showData: SimpleDataType[] = data.allFile.edges[1].node.fields.data.map(
    function (element) { return { x: element.pref_name_jp, y: element.pref_nheavycurrentpatients } });
  showData.sort((a, b) => -a.y + b.y)
  console.log(showData);
  return (

    <div className="columns">
      <div className="column">
        <h1 className="title is-1">コロナ重症者数</h1>
        <h2 className="subtitle is-4">都道府県別</h2>
        <ParentSize>
          {parent => (
            <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 700, showData, 'green', 'black', tickFormat)} />
          )}
        </ParentSize>
      </div>

    </div>

  )
}