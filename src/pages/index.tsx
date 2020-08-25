import React from "react"
import { graphql } from 'gatsby';
import "../styles/bulma.scss";

import Layout from '../components/layout';
import Table from '../components/table';

import SimpleHorizontalBars from '../components/simpleHorizontalBars';
import SimpleDataScaler from '../components/simpleDataScaler'
import { SimpleDataType } from '../components/simpleData';
import { ParentSize } from '@vx/responsive';
import { descending } from 'd3-array';
import { timeFormat } from 'd3-time-format';


const tickFormat = (y: string) => y;
const formatDate = timeFormat("%Y/%m/%d");


export default function Home({ data }) {


  const rawData = data.transformedData.data.latestCovidPatient.data;
  const latestDate = new Date(data.transformedData.data.latestCovidPatient.latestDate);

  const heavyPatientsData: SimpleDataType[] = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_nheavycurrentpatients }))
    .sort((a, b) => descending(a.y, b.y));

  const patientsData: SimpleDataType[] = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_ncurrentpatients }))
    .sort((a, b) => descending(a.y, b.y));

  const positivesData: SimpleDataType[] = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_npatients }))
    .sort((a, b) => descending(a.y, b.y));



  const tableData = React.useMemo(
    () => heavyPatientsData,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '都道府県',
        accessor: 'x', // accessor is the "key" in the data
      },
      {
        Header: '重症者数',
        accessor: 'y',
      },
    ],
    []
  )


  return (
    <Layout>
      <div className="columns is-centered has-background-light px-4">
        <div className="column">
          <Table columns={columns} data={tableData} />
        </div>
      </div>
      <div className="columns is-centered has-background-light px-4">
        <div className="column">
          <div className="card px-3 py-2">
            <h1 className="title is-4">累計陽性者数</h1>
            <h2 className="subtitle is-6">{formatDate(latestDate) + "時点"}</h2>
            <ParentSize>
              {parent => (
                <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 1200, positivesData, 'hsl(217, 71%, 53%)', 'hsl(0, 0%, 21%)', tickFormat)} />
              )}
            </ParentSize>
          </div>
        </div>
        <div className="column">
          <div className="card px-3 py-2">
            <h1 className="title is-4">入院治療等を要する者</h1>
            <h2 className="subtitle is-6">{formatDate(latestDate) + "時点"}</h2>
            <ParentSize>
              {parent => (
                <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 1200, patientsData, 'hsl(217, 71%, 53%)', 'hsl(0, 0%, 21%)', tickFormat)} />
              )}
            </ParentSize>
          </div>
        </div>
        <div className="column">
          <div className="card px-3 py-2">
            <h1 className="title is-4">重症者数</h1>
            <h2 className="subtitle is-6">{formatDate(latestDate) + "時点"}</h2>
            <ParentSize>
              {parent => (
                <SimpleHorizontalBars {...new SimpleDataScaler(parent.width, 1200, heavyPatientsData, 'hsl(217, 71%, 53%)', 'hsl(0, 0%, 21%)', tickFormat)} />
              )}
            </ParentSize>
          </div>
        </div>
      </div>
    </Layout>
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