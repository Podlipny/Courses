import { Duplex, Transform } from 'node:stream'

const server = Duplex({
  objectMode: true,
  write(chunk, enc, callback){
    console.log(`[writable] saving`, chunk)
    callback()
  },
  read(){
    const everySecond = (intervalContext) => {
      this.counter = this.counter ?? 0
      if(this.counter++ <= 5) {
        this.push(`My name is Erick[${this.counter}]`)
        return;
      }
      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval( function () { everySecond(this) })
  }
})
// to prove that they're different communication channels
// write triggers the writable stream from our duplex
server.write('[duplex] key this is a writable\n')

// on data -> our server.on(data) will be trigger everytime
// we call the push function!

server.push(`[duplex] hey this is also a readable`)
const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, callback) {
    callback(null, chunk.toUpperCase())
  }
})

transformToUpperCase.write(`[transform] hello from writer`)
// the push method will ignore what you have in the transform function
transformToUpperCase.push(`[transform] hello from reader`)

server
.pipe(transformToUpperCase)
// it'll redirect all data to the duplex's writable channel
.pipe(server)