import readline from 'node:readline'
function log(message) {
  readline.cursorTo(process.stdout, 0)
  process.stdout.write(message)
}

export {
  log
}