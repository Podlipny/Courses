
import {
  ReadableStream,
  WritableStream,
  TransformStream,
  TextDecoderStream
} from 'node:stream/web'
import { setInterval, setTimeout } from 'node:timers/promises'
import { Readable } from 'node:stream'
async function* myCustomReadable() {
  yield Buffer.from('This is my')
  await setTimeout(200)
  yield Buffer.from('custom readable')
}

// this will convert Node JS readable to web stream
const readable = Readable.toWeb(Readable.from(myCustomReadable()))
// const readable = new ReadableStream({
//   async start(controller) {
//     for await (const i of setInterval(200)) {
//       controller.enqueue(`Hello-${new Date().toISOString()}`)
//     }
//   }
// })

readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TransformStream({
    transform(chunk, controller) {
      const data = chunk.toUpperCase()
      controller.enqueue(data)
    }
  }))
  .pipeTo(new WritableStream({
    write(chunk) {
      console.log('chunk', chunk)
    },
    close() {
      console.log('finished writing!!')
    }
  }))