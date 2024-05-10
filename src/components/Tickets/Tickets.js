import TicketsUI from './TicketsUI'

export default class Tickets {
  #ui
  constructor(element) {
    this.#ui = new TicketsUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  #addElements() {}

  #addEventListeners() {
    document.addEventListener('loadedTickets', this.#onLoadedTickets)
  }

  #onLoadedTickets = ({ detail: tickets }) => {
    console.log('🚀 ~ tickets:', tickets)
  }
}
