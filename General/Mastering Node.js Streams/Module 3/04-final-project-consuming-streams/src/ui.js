import ComponentsBuilder from "./componentsBuider.js"
let components
let abortController = getController()
let active = false
const MAX_ITEMS_VISIBLE = 35
function getController() { return new AbortController ()}
function addMessageOnTop(msg) {
  const table = components.table
  const {
    content
  } = table.items.shift()
  const items = table.items.slice(0, MAX_ITEMS_VISIBLE).map(item => item.content)
  table.clearItems()
  // we put the title first on top
  table.addItem(content)
  table.addItem(msg)

  items.forEach(item => table.addItem(item))

  components.screen.render()
}
function log(msg) {
  addMessageOnTop(msg)
}

function renderUi(initializeFn) {

  components = new ComponentsBuilder()
    .setScreen({
      title: 'Mastering Node.js Streams'
    })
    .setLayoutComponent()
    .setFormComponent({
      onStart: () => {
        if(active) return
        abortController = getController()
        abortController.signal.onabort = () => {
          addMessageOnTop(`{bold}canceled{/}`)
        }
        initializeFn(abortController.signal)
      },
      onCancel: () => {
        active = false
        abortController.abort()
      }
    })
    .setDataTableComponent()
    .build()
  
  components.form.focus()
  components.screen.render()
}

export {
  renderUi,
  log
}