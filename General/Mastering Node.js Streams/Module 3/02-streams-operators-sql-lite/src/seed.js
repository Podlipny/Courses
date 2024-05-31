import sqlite3 from 'sqlite3'
import { faker } from '@faker-js/faker'
import { promisify } from 'node:util'
const connection = sqlite3.verbose()
const db = new connection.Database('./data/db')
const serializeAsync = promisify(db.serialize.bind(db))
const runAsync = promisify(db.run.bind(db))

console.time('db-insert')
await serializeAsync

await runAsync(
  "CREATE TABLE users (id TEXT, name TEXT, age NUMBER, company TEXT)"
)

function generateUser() {
  const user = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    age: faker.datatype.number({ min: 18, max: 110 }),
    company: faker.company.name(),
  }
  return [ user.id, user.name, user.age, user.company]
}
const promises = []
for(let i =0; i < 100_000; i++) {
  const user = generateUser()
  promises.push(runAsync(
    `INSERT INTO users(id, name, age, company) VALUES(${user.map(_ => '?').join(',')})`,
    user
  ))
}

await Promise.all(promises)
console.log('finished inserting data', promises.length, 'item')

db.all("SELECT COUNT(rowid) as counter FROM users", (err, row) => {
  if(err) {
    console.error('error', error)
    return;
  }
  console.log(row)
  console.timeEnd('db-insert')
})