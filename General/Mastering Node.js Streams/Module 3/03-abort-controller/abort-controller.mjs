import { pipeline } from 'node:stream/promises'
import { setInterval } from 'node:timers/promises'
import { Readable } from 'node:stream'
async function * myCustomReadable(abortController) {
  for await(const interval of setInterval(200)) {
    // if(abortController.signal.aborted) break;
    yield Buffer.from(`tick: ${new Date().toISOString()}`)
  }
}

async function * myCustomWritable(stream) {
  for await(const chunk of stream) {
    console.log(chunk.toString())
  }
}
const abortController = new AbortController()
abortController.signal.onabort = () => {
  console.log('onabort - hey I was triggered')
}
setTimeout(() => { abortController.abort(); }, 500)

try {
  
await pipeline(
  // myCustomReadable, // here the abortController goes on the param
  Readable.from(myCustomReadable()),
  myCustomWritable,
  { signal: abortController.signal }
)

} catch (error) {
  if(error.code !== 'ABORT_ERR') throw error
}