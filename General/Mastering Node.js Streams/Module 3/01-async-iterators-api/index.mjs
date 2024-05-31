import { pipeline } from 'node:stream/promises'
import { setTimeout } from 'node:timers/promises'
async function * myCustomReadable() {
  yield Buffer.from('This is my')
  await setTimeout(100)
  yield Buffer.from('custom readable!')
}

async function * myCustomTransform(stream) {
  for await(const chunk of stream) {
    yield chunk.toString().replace(/\s/g, "_")
  }
}

async function * myCustomWritable(stream) {
  for await(const chunk of stream) {
    console.log('[writable]', chunk)
  }
}

async function * myCustomDuplex(stream) {
  let bytesRead = 0;
  const wholeString = []
  for await(const chunk of stream) {
    console.log('[duplex writable]', chunk)
    bytesRead+= chunk.length
    wholeString.push(chunk)
  }

  yield `wholeString: ${wholeString.join()}`
  yield `bytesRead: ${bytesRead}`
}

await pipeline(
  myCustomReadable,
  myCustomTransform,
  myCustomDuplex,
  myCustomWritable
)