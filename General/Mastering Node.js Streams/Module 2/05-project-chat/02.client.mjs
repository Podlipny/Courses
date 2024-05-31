import net from 'node:net'
import { Writable, PassThrough } from 'node:stream'

import readline from 'node:readline'
// this will read line from the terminal plus it disaplays message before cursor
function log(message) {
  readline.cursorTo(process.stdout, 0)
  process.stdout.write(message)
}

// we are reading stream if anything is comming from the server
const output = Writable({
  write(chunk, enc, callback) {
    const {
      id,
      message
    } = JSON.parse(chunk)

    if(message) log(`reply from ${id}: ${message}`)
    else log(`my username: ${id}\n`)

    log(`type: `)
    callback(null, chunk)
  }
})

// aftre message is send we need to start reading from terminal again
const resetChatAfterSent = PassThrough()
resetChatAfterSent.on('data', _ => {
  log('type: ')
})

process.stdin
  .pipe(resetChatAfterSent)
  .pipe(net.connect(3000))
  .pipe(output)

