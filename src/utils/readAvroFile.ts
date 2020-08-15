const avsc = require('avsc');
const snappy = require('snappy');

export default function createAvroReader(filePath: string) {
    return avsc.createFileDecoder(filePath, { codecs: {
        snappy: function (buf, cb) {
            // Avro appends checksums to compressed blocks, which we skip here.
            return snappy.uncompress(buf.slice(0, buf.length - 4), cb);
        }
    }, codec: 'snappy'
    })   
}