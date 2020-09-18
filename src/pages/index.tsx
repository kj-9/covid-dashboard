import React from "react"
import { graphql } from 'gatsby';
import "../styles/bulma.scss";

import Layout from '../components/layout';
import Table from '../components/Table';

import Bar from '../components/Bar';
import { descending } from 'd3-array';
import { timeFormat } from 'd3-time-format';


const tickFormat = (y: string) => y;
const formatDate = timeFormat("%Y/%m/%d");

export default function Home({ data }) {

  const rawData =  data.allCovidPatientsCsv.nodes;

  //check number of prefectures in data
  const setPrefs = new Set(rawData.map(node => node.pref_name_jp));
  if (setPrefs.size !== 47) throw Error("number of unique prefecture is not 47.")

  // transform data
  const latestDate = new Date(rawData.map(node => node.update_date)[0])

  const heavyPatientsData = rawData
    .map(element => ({ x: element.pref_name_jp, y: element.pref_n_current_heavy_patients }))
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
        Cell: ({ value }) =>  Bar({ data: [{x: "test", y: value }], domain: { y: [0, 50]} })
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
    </Layout>
  )
}


export const pageQuery = graphql`
query HomePageQuery {
  allCovidPatientsCsv(sort: {order: DESC, fields: update_date}, limit: 47) {
      nodes {
        update_date
        pref_name_jp
        pref_n_patients
        pref_n_current_patients
        pref_n_current_heavy_patients
    }
  }
}
`