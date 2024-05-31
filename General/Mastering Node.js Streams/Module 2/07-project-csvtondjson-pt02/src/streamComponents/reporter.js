import { log } from "../util.js"
import { PassThrough } from 'node:stream'

// Buffer.from('1,erick-1,1-text,1').byteLength
// Buffer.from('{"id":0,"name":"erick-1","desc":"1-text","age":"1"}').byteLength

const A_HUNDRED_PERCENT = 100
export default class Reporter {
  #loggerFn
  LINE_LENGTH_AFTER_TURNED_INTO_JSON = 40
  constructor({ logger = log } = {}) {
    this.#loggerFn = logger
  }

  #onData(amount) {
    let totalChunks = 0
    return (chunk) => {
      totalChunks += (chunk.length - this.LINE_LENGTH_AFTER_TURNED_INTO_JSON)
      const processed = A_HUNDRED_PERCENT / amount * totalChunks
      this.#loggerFn(`processed ${processed.toFixed(2)}%`)
    }
  }
  progress(amount) {
    const progress = PassThrough()
    progress.on('data', this.#onData(amount))
    // we shoulsd always send 100% when the stream ends, because we can't guarantee that the last
    // chunk will be the same size as the others
    progress.on('end', () => this.#loggerFn(`processed ${A_HUNDRED_PERCENT}.00%`))
    return progress
  }
}