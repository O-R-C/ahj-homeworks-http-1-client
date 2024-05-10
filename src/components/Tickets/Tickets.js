import TicketsUI from './TicketsUI'

export default class Tickets {
  #ui
  #currentId
  #timerCheckboxChange

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
    this.#ui.confirmContainer.addEventListener('close', this.#onConfirmDelete)
    this.#ui.confirmContainer.addEventListener('keypress', this.#onConfirmKeyPress)
  }

  #onLoadedTickets = ({ detail: tickets }) => {
    this.#ui.renderTickets(tickets)
  }

  #onClick = (event) => {
    const target = event.target
    const ticket = this.#getTicket(target)

    if (!ticket) return

    const id = this.#getId(ticket)

    if (this.#isBtnDelete(target)) {
      this.#onClickBtnDelete(id)
      return
    }

    if (this.#isBtnEdit(target)) {
      this.#onClickBtnEdit(id)
      return
    }

    const checkbox = this.#isCheckbox(target)
    if (checkbox) {
      this.#onClickCheckbox(checkbox, id)
      return
    }

    this.#onClickTicket(id)
  }

  #getTicket(target) {
    return target.closest('div[class*="ticket"]')
  }

  #getId(ticket) {
    return ticket.dataset.id
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

  #onClickBtnDelete(id) {
    this.#currentId = id
    this.#ui.confirmContainer.returnValue = 'cancel'
    this.#ui.showConfirmDeleteForm()
  }

  #onConfirmDelete = (event) => {
    if (event.currentTarget.returnValue === 'cancel') return

    this.#deleteTicket(this.#currentId)
  }

  #onConfirmKeyPress = (event) => {
    if (event.key !== 'Enter') return

    event.currentTarget.returnValue = 'confirm'
    this.#onConfirmDelete(event)
  }

  #onClickBtnEdit(id) {}

  #onClickCheckbox(checkbox, id) {
    if (this.#timerCheckboxChange) {
      clearTimeout(this.#timerCheckboxChange)
    }

    if (checkbox.checked === checkbox.savedStatus) return

    this.#timerCheckboxChange = setTimeout(() => {
      checkbox.savedStatus = checkbox.checked
      this.#fireCheckboxChange(checkbox, id)
    }, 500)
  }

  #onClickTicket(id) {}

  #deleteTicket(id) {
    this.#fireDeleteTicket(id)
  }

  #getCheckboxChange(checkbox, id) {
    return new CustomEvent('checkboxChange', {
      detail: { status: checkbox.checked, id },
    })
  }

  #getDeleteTicket(id) {
    return new CustomEvent('deleteTicket', {
      detail: id,
    })
  }

  #fireCheckboxChange(checkbox, id) {
    document.dispatchEvent(this.#getCheckboxChange(checkbox, id))
  }

  #fireDeleteTicket(id) {
    document.dispatchEvent(this.#getDeleteTicket(id))
  }
}
