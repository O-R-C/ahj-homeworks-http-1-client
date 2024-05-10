import HelpDeskUI from './HelpDeskUI'

export default class HelpDesk {
  #url = 'http://localhost:3000/tickets'
  #ui
  #app

  constructor(element) {
    this.#ui = new HelpDeskUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()

    this.#loadAllTickets()
  }

  #addElements() {
    this.#app = this.#ui.app
  }

  #addEventListeners() {
    this.#ui.btnAddTicket.addEventListener('click', this.#onClickAddTicket)
  }

  #loadAllTickets = async () => {
    const tickets = await this.#fetchData(this.#url)

    this.#fireLoadedTicketsEvent(tickets)
  }

  #fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      return data
    } catch (error) {
      return error
    }
  }

  #getLoadedTickets(tickets) {
    return new CustomEvent('loadedTickets', { detail: tickets })
  }

  #fireLoadedTicketsEvent(tickets) {
    document.dispatchEvent(this.#getLoadedTickets(tickets))
  }

  #onClickAddTicket = () => {
    this.#showForm()
  }

  #showForm() {
    this.#ui.formContainer.showModal()
  }
}
