import TicketFormUI from './TicketFormUI'

export default class TicketForm {
  #ui
  constructor(element) {
    this.#ui = new TicketFormUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  #addElements() {}

  #addEventListeners() {}
}
