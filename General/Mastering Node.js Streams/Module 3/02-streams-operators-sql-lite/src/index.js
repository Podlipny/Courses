// transform - SQL data (sqlite) to noSQL (json data)

import sqlite3 from 'sqlite3'
import {
  Readable
} from 'node:stream'
import {
  pipeline
} from 'node:stream/promises'
import {
  promisify
} from 'node:util'
import { createWriteStream } from 'node:fs'
const connection = sqlite3.verbose()
const db = new connection.Database('./data/db')
const serializeAsync = promisify(db.serialize.bind(db))
const runAsync = promisify(db.run.bind(db))
const findAllAsync = promisify(db.all.bind(db))
console.time('sql-to-ndjson')

await serializeAsync()

async function* selectAsStream() {
  const defaultLimit = 100;
  let skip = 0;

  while (true) {
    const data = await findAllAsync(
      `SELECT * FROM users LIMIT ${defaultLimit} OFFSET ${skip}`
    )
    skip += defaultLimit
    // if we've consumed all data it's gonna stop!
    if (!data.length) break;
    for (const item of data) yield item
  }
}
let processed = 0
const stream = Readable.from(selectAsStream())
  .filter(({
    age
  }) => age > 25 && age < 50)
  .map(async (item) => {
    const name = await Promise.resolve(item.name.toUpperCase())
    return {
      ...item,
      name,
      at: new Date().toISOString()
    }
  })
  .map(item => {
    processed++
    return JSON.stringify(item).concat("\n")
  })
  // .forEach(item => console.log(item))

// for await (const item of stream) {
//   console.log(item)
// }

await pipeline(
  stream,
  createWriteStream('./data/output.ndjson')
)
console.log(`\nprocess has finished with  ${processed} items...`)
console.timeEnd('sql-to-ndjson')