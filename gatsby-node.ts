
import readAvroFile from './src/utils/readAvroFile';
import * as d3 from 'd3-array';

function convertPlainObject(objectArray: object[]): object[] {
    return objectArray.map(element => Object.assign({}, element))
}

export const sourceNodes = async ({ actions, createNodeId, createContentDigest, getNodes }) => {
    const { createNode, createNodeField } = actions;
    const nodes = getNodes();


    // process patient data
    const patientPath = /hobby-project-datalake\/staging\/covid\/ingest-covid-patients\/stopcovid19-japan-all-patients/g;
    const patientNodes = nodes.filter(node => patientPath.test(node.relativePath) && node.ext === '.avro')
    const rawData: RawData[] = await patientNodes
        .map(async (node) => await readAvroFile(node.absolutePath))
        .reduce((array1, array2) => array1.concat(array2));

    interface RawData {
        lastUpdate: string,
        pref_name_jp: string
    }

    const groupedData = d3.rollup(rawData, data => d3.max(data, localData => new Date(localData.lastUpdate)), data => data.pref_name_jp)
    const latestDate = d3.min(groupedData.values())
    const latestData = rawData.filter(element => new Date(element.lastUpdate).toDateString() == latestDate.toDateString())


    // need to convert to plain object... see:https://github.com/sanity-io/gatsby-source-sanity/issues/25   
    let out = convertPlainObject(latestData);

    const data = {
        patient: out
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