import HelpDeskUI from './HelpDeskUI'

export default class HelpDesk {
  #ui
  #app

  constructor(element) {
    this.#ui = new HelpDeskUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  #addElements() {
    this.#app = this.#ui.app
  }

  #addEventListeners() {}
}
