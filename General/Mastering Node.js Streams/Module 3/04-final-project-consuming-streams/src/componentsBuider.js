import blessed from 'blessed'

export default class ComponentsBuilder {
  screen 
  layout
  form
  table
  setScreen({ title }) {
    this.screen = blessed.screen({
      smartCSR: true,
      title
    })

    this.screen.key(['escape', 'q',  'C-c'], () => process.exit(0))
    return this
  }

  setLayoutComponent() {
    this.layout = blessed.layout({
      parent: this.screen,
      width: '100%',
      height: '100%'
    })

    return this
  }
  
  setFormComponent({ onStart, onCancel }) {
    const form = blessed.form({
      parent: this.screen,
      keys: true,
      bottom: 0,
      height: '20%'
    })
    const start = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: '40%',
      name: 'submit',
      content: 'submit',
      style: {
        bg: 'white',
        focus: {
          bg: 'green'
        },
        hover: {
          bg: 'green'
        }
      }
    })
    const stop = blessed.button({
      parent: form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: '70%',
      name: 'cancel',
      content: 'cancel',
      style: {
        bg: 'white',
        focus: {
          bg: 'red'
        },
        hover: {
          bg: 'red'
        }
      }
    })

    start.on('press', onStart)
    stop.on('press', onCancel)

    this.form = form

    return this
  }
  setDataTableComponent() {
    this.table = blessed.list({
      border: 'line',
      mouse: true,
      keys: true,
      top: 0,
      scrollbar: {
        ch: '',
        inverse: true
      },
      // this enables us to put colors on the text!
      tags: true,
      parent: this.layout,
      align: 'center',
      width: '100%',
      height: '70%',
      items: ['{bold}Data{/}']
    })

    return this
  }
  build() {
    return {
      screen: this.screen,
      form: this.form,
      table: this.table
    }
  }
}