// for i in `seq 1 20`; do node -e "process.stdout.write('hello world'.repeat(1e7))" >> big.file; done
// 1e7 => 10.000.000

import {
  promises,
  createReadStream,
  statSync
} from 'node:fs'
const filename = './big.file'

try {
  const file = await promises.readFile(filename)
  console.log('file size', file.byteLength / 1e9, "GB", "\n")
  console.log('fileBuffer', file)
} catch (error) {
  console.log('error: max 2GB reached..', error.message)
}

const {
  size
} = statSync(filename)
console.log('file size', size / 1e9, "GB", "\n")

let chunkConsumed = 0;
const stream = createReadStream(filename)
// 65K per readable!
// triggered by the first stream.read
.once('data', msg => {
  console.log('on data length', msg.toString().length)
})
.once('readable', _ => {
  // this stream.read(11) will trigger the on(data) event
  console.log('read 11 chunk bytes', stream.read(11).toString())
  console.log('read 05 chunk bytes', stream.read(5).toString())

  chunkConsumed += 11 + 5
})
.on('readable', _ => {
  let chunk;
  // stream.read() reads max 65Kbytes
  while(null !== (chunk = stream.read())) {
    chunkConsumed += chunk.length
  }
})
.on('end', () => {
  console.log(`Read ${chunkConsumed / 1e9} bytes of data...`)
})