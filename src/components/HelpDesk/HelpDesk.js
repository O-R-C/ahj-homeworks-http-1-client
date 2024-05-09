import HelpDeskUI from './HelpDeskUI'

export default class HelpDesk {
  #ui = new HelpDeskUI()
  #app = this.#ui.app
  #element

  constructor(element) {
    this.#element = this.#ui.getElement(element)

    this.#init()
  }

  #init() {
    this.#bindToDom()
  }

  #bindToDom() {
    this.#element.append(this.#ui.app)
  }
}
