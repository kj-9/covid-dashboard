
import { readAvroNode } from './src/utils/avro';
import toPlainObject from './src/utils/toPlainObject'
import * as d3 from 'd3-array';

export const sourceNodes = async ({ actions, createNodeId, createContentDigest, getNodes }) => {
    const { createNode } = actions;
    const nodes = getNodes();

    // process patient data
    const patientPath = /hobby-project-datalake\/staging\/covid\/ingest-covid-patients\/stopcovid19-japan-all-patients/;
    const patientData = await readAvroNode(patientPath, nodes);

    const groupedData = d3.rollup(patientData, data => d3.max(data, localData => new Date(localData.lastUpdate)), data => data.pref_name_jp)
    const latestDate = d3.min(groupedData.values())
    const latestData = patientData.filter(element => new Date(element.lastUpdate).toDateString() == latestDate.toDateString())

    // process bed data
    const bedPath = /hobby-project-datalake\/staging\/covid\/ingest-covid-beds\/google-spread-sheets-covid-beds/;
    const bedData = await readAvroNode(bedPath, nodes);
    

    // need to convert to plain object... see:https://github.com/sanity-io/gatsby-source-sanity/issues/25   
    const data = {
        latestCovidPatient: {
            data: toPlainObject(latestData),
            latestDate: latestDate
        },
        latestCovidBeds: {
            data: toPlainObject(bedData),
        }
    }

    createNode({
        data: data,
        id: createNodeId(`transformed-data-`),
        parent: null,
        children: [],
        internal: {
            type: 'transformedData',
            content: JSON.stringify(data),
            contentDigest: createContentDigest(data),
        },
    })

    return
}