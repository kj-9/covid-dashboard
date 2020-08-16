
import readAvroFile from './src/utils/readAvroFile';

function convertPlainObject(objectArray: object[]): object[] {
    return objectArray.map(element => Object.assign({}, element))
}

export const onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "File" && node.ext === ".avro") {
        let data = await readAvroFile(node.absolutePath);
        
        // need to convert to plain object... see:https://github.com/sanity-io/gatsby-source-sanity/issues/25    
        let out = convertPlainObject(data.filter(element => element.lastUpdate === "2020-08-08"));

        createNodeField({
            node,
            name: "data",
            value: out
        })
    }
}