const avsc = require('avsc');
const snappy = require('snappy');
const getStream = require('get-stream');

export async function readAvroFile(filePath: string) {
    const readStream = avsc.createFileDecoder(filePath, {
        codecs: {
            snappy: function (buf, cb) {
                // Avro appends checksums to compressed blocks, which we skip here.
                return snappy.uncompress(buf.slice(0, buf.length - 4), cb);
            }
        }, codec: 'snappy'
    });

    return await getStream.array(readStream);
}

export async function readAvroNode(matchPath: RegExp, nodes) {
    const avroNodes = nodes.filter(node => matchPath.test(node.relativePath) && node.extension === "avro")
    console.log("lets process bed data")
    const data: any[] = await avroNodes
    .map(async (node) => await readAvroFile(node.absolutePath))
    .reduce((array1:object[], array2:object[]) => array1.concat(array2));

    return data;
}