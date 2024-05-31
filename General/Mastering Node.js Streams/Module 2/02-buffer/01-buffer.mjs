// allocation 5 bytes
const buffer = Buffer.alloc(5)
buffer.fill('hi', 0, 2)
buffer.fill(0x3a, 2, 3) // hexadecimal char code for : 
buffer.fill(0x29, 4, 5) // hexadecima char code for )
// error, whe it reaches max value, it should be moved to another buffer
// console.log(buffer.toString())
// buffer.fill('h', 5, 6)

const anotherBuffer = Buffer.alloc(6)
anotherBuffer.set(buffer, buffer.byteOffset)
anotherBuffer.fill('four', 5, 6)
console.log(buffer.toString(), buffer, buffer.byteLength)
console.log(anotherBuffer.toString(), anotherBuffer, anotherBuffer.byteLength)

// or with full data
const msg = 'Hey there!'
const preAllocated = Buffer.alloc(msg.length, msg)

// same thing of Buffer.from(msg)
const withBufferFrom = Buffer.from(msg)
console.log(preAllocated.toString(), preAllocated, preAllocated.byteLength)
console.log(withBufferFrom.toString(), withBufferFrom, withBufferFrom.byteLength)


// ----------
const str = 'Hello World'

const charCodes = []
const bytes = []
for(const index in str) {
  // integer or decimals
  const code = str.charCodeAt(index)
  const byteCode = '0x' + Math.abs(code).toString(16)
  charCodes.push(code)
  bytes.push(byteCode)
}

console.log({
  charCodes,
  bytes,
  contentFromCharCodes: Buffer.from(charCodes).toString(),
  contentFromHexaBytes: Buffer.from(bytes).toString()
})