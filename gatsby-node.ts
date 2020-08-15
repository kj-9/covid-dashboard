
import createAvroReader from './src/utils/readAvroFile';
const getStream = require('get-stream');

export const onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions;

    class Test {
        id: string;
        constructor(id) {
            this.id = id;
        }
    }

    if (node.internal.type === "File" && node.ext === ".avro") {
        let data = await getStream.array(createAvroReader(node.absolutePath));

        // need to convert to plain object... see:https://github.com/sanity-io/gatsby-source-sanity/issues/25
        let out = data.map(element => Object.assign({}, element));
        createNodeField({
            node,
            name: "data",
            value: out
        })

    }
}