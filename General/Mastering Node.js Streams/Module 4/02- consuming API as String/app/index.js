const API_URL = 'http://localhost:3000'
let counter = 0
async function consumeAPI(signal) {
  const response = await fetch(API_URL, {
    signal
  })
  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parseNDJSON())


  return reader
}


function parseNDJSON() {
  let buffer = ''
  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk
      // only handling cases where 2 items comes in one chunk
      const items = buffer.split('\n')
      items.slice(0, -1)
        .forEach(item => controller.enqueue(JSON.parse(item)))

      buffer = items[items.length - 1]
    },
    flush(controller) {
      if (!buffer) return
      controller.enqueue(JSON.parse(buffer))
    }
  })
}

function appendToHTML(element) {
  return new WritableStream({
    write({ title, description, url }) {
      const card = `
        <article>
          <div class="text">
            <h3>[${++counter}]${title}</h3>
            <p>${description.slice(0, 100)}</p>
            <a href="${url}"> Here's why</a>
          </div>
        </article>`

      element.innerHTML += card
    },
    abort(reason) {
      // console.log('aborted**', reason)
    }
  })
}

const [
  start,
  stop,
  cards
] = ['start', 'stop', 'cards']
  .map(item => document.getElementById(item))

let abortController = new AbortController()
start.addEventListener('click', async () => {
  try {
    const readable = await consumeAPI(abortController.signal)
    await readable
      .pipeTo(
        appendToHTML(cards),
        { signal: abortController.signal }
      )

  } catch (error) {
    if (!error.message.includes('abort')) throw error
  }
})
stop.addEventListener('click', async () => {
  abortController.abort()
  console.log('aborting...')
  abortController = new AbortController()
  counter = 0
})

  // .pipeTo(new WritableStream({
  //   write(chunk) {
  //     console.log('chunk', chunk)
  //   }
  // }))