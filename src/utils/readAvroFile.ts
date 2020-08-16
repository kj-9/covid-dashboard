const avsc = require('avsc');
const snappy = require('snappy');
const getStream = require('get-stream');

export default async function readAvroFile(filePath: string) {
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