// done


/*
echo "id,name,desc,age" > big.csv
for i in `seq 1 5`; do node -e "process.stdout.write('$i,erick-$i,$i-text,$i\n'.repeat(1e5))" >> big.csv; done # 500K items
for i in `seq 1 5`; do node -e "process.stdout.write('$i,erick-$i,$i-text,$i\n'.repeat(1e7))" >> big.csv; done  #50M items
*/

import CSVToNDJSON from "./streamComponents/csvtondjson.js"
import Reporter from "./streamComponents/reporter.js"
import { log } from "./util.js"
import { statSync, createReadStream, createWriteStream } from 'node:fs'
import { Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
const reporter = new Reporter()
const filename = 'big.csv'
const { 
 size: fileSize
} = statSync(filename)

let counter = 0
const processData = Transform({
  transform(chunk, enc, callback) {
    const data = JSON.parse(chunk)
    const result = JSON.stringify({
      ...data,
      id: counter++
    }).concat('\n')

    return callback(null, result)
  }
})
const csvToJSON = new CSVToNDJSON({
  delimiter: ',',
  headers: ['id','name','desc','age']
})

const startedAt = Date.now()
await pipeline(
  createReadStream(filename),
  csvToJSON,
  processData,
  reporter.progress(fileSize),
  createWriteStream('big.ndjson')
)
const A_MILLISECOND = 1000
const A_MINUTE = 60

const timeInSeconds = Math.round((Date.now() - startedAt) / A_MILLISECOND).toFixed(2)
const finalTime = timeInSeconds > A_MILLISECOND ? `${timeInSeconds / A_MINUTE}m`: `${timeInSeconds}s`
log(`took: ${finalTime} - processed items ${counter} - process finished with success!`)