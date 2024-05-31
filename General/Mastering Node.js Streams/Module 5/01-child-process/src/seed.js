import { faker } from  '@faker-js/faker'
import { createWriteStream } from 'node:fs'
const file1 = createWriteStream('database/file1.ndjson')
const file2 = createWriteStream('database/file2.ndjson')
const file3 = createWriteStream('database/file3.ndjson')

function createRandomUser() {
  return { 
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    registeredAt: faker.date.past()
  }
}

;
[file1, file2, file3].forEach((file, index) => {
  const currentFile = `file${index + 1}`
  console.time(currentFile)
  // 1.000.000
  for(let i = 0; i < 1e6; i++) {
  // for(let i = 0; i < 1e4; i++) {
    file.write(`${JSON.stringify(createRandomUser())}\n`)
  }
  file.end()
  console.timeEnd(currentFile)
})