import {
  Readable,
  Writable,
  Transform,
} from 'node:stream'
import {
  randomUUID
} from 'node:crypto'

import {
  createWriteStream
} from 'node:fs'
// data source: file, database, website, anything you can consume on demand!
const readable = Readable({
  read() {
    //  1.000.000
    for (let index = 0; index < 1e6; index++) {
      const person = {
        id: randomUUID(),
        name: `Erick-${index}`
      }
      const data = JSON.stringify(person)
      this.push(data)
    }
    // notify that the data is empty (consumed everything)
    this.push(null)
  }
})

const mapFields = Transform({
  transform(chunk, enc, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    cb(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, enc, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk)
    }
    this.counter += 1;
    cb(null, 'id,name\n'.concat(chunk))
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my.csv'))

pipeline
  .on('end', () => console.log('task finished...'))
// writable is always the output -> print smth, save, ignore, send email, send to other stream.
// .pipe(process.stdout)