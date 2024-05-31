import { createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import split from 'split'
console.log('initializing', process.pid)
// once just to get the first message and then die
process.once('message', async msg => {
  try {
    await pipeline(
      createReadStream(msg),
      split(),
      async function* (source) {
        let counter = 0
        for await (const chunk of source) {
          // ignore empty lines
          if (!chunk.length) continue

          // simulating an error
          // if(++counter <= 20) {
          //   throw new Error(
          //     `found some problem in item\n${chunk.toString()}`
          //   )
          // }

          const item = JSON.parse(chunk)
          if (!item.email.includes('gmail'))
            continue

          process.send({
            status: 'success',
            message: item
          })
        }
      }
    )

  } catch (error) { 
    process.send({
      status: 'error',
      message: error.message
    })
  }
})