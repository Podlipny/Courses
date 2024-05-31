import { readdir } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { fork } from 'node:child_process'
import { Readable, PassThrough } from 'node:stream'
import { pipeline } from 'node:stream/promises'
const backgroundJobPath = './src/backgroundJob.js'
const output = createWriteStream('./database/output-gmail.ndjson')
console.time('child-processes')
function merge(streams) {
  let pass = new PassThrough()
  let waiting = streams.length
  for (const stream of streams) {
    pass = stream.pipe(pass, { end: false })
    stream.once('end', () => --waiting === 0 && pass.emit('end'))
  }

  return pass
}

function childProcessAsStream(cp, file) {
  const stream = Readable({
    read() { }
  })
  cp.on('message', ({ status, message }) => {
    if (status === 'error') {
      console.log({
        msg: 'got an error!',
        file,
        pid: cp.pid,
        message: message.split('\n')
      })
      
      // this will make our stream for this file stop
      stream.push(null)
      return
    }

    stream.push(JSON.stringify({
      ...message,
      file,
      pid: cp.pid,
    }).concat("\n"))
  })

  cp.send(file)

  return stream
}

const files = (await readdir('./database'))
  .filter(item => !item.includes('output'))

const counters = {}
const childProcessesStreams = []
for (const file of files) {
  const cp = fork(backgroundJobPath, [], {
    // this will print out the consoles we have in the background
    // job
    silent: false
  })
  counters[cp.pid] = { counter: 1 }

  const stream = childProcessAsStream(cp, `./database/${file}`)
  childProcessesStreams.push(stream)
}
const allStreams = merge(childProcessesStreams)
await pipeline(
  allStreams,
  async function* (source) {
    for await (const chunk of source) {
      for (const line of chunk.toString().trim().split('\n')) {
        const { file, ...data } = JSON.parse(line)
        const counter = counters[data.pid].counter++
        console.log(`${file} found ${counter} so far...`)
        yield JSON.stringify(data).concat('\n')
      }
    }
  },
  output
)
console.timeEnd('child-processes')
