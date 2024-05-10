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
    this.#ui.app.addEventListener('click', this.#onClick)
  }

  #onLoadedTickets = ({ detail: tickets }) => {
    this.#ui.renderTickets(tickets)
  }

  #onClick = (event) => {
    const target = event.target

    if (target.closest('button[class*="btn-delete"]')) {
      this.#deleteTicket(target)
    }
  }

  #isBtnDelete(target) {
    return target.closest('button[class*="btn-delete"]')
  }

  #isBtnEdit(target) {
    return target.closest('button[class*="btn-edit"]')
  }

  #isCheckbox(target) {
    return target.closest('input[type="checkbox"]')
  }

  #isTicket(target) {
    return target.closest('div[class*="ticket"]')
  }

  #onClickBtnDelete() {}

  #onClickBtnEdit() {}

  #onClickCheckbox() {}

  #onClickTicket() {}

  #deleteTicket(target) {}
}
