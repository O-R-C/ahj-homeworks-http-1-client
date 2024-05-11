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
      this.#onClickBtnEdit(id, ticket)
      return
    }

    const checkbox = this.#isCheckbox(target)
    if (checkbox) {
      this.#onClickCheckbox(checkbox, id)
      return
    }

    this.#onClickTicket(id, ticket)
  }

  #getTicket(target) {
    return target.closest('div[class^="ticket--"]')
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
    const wrapper = target.closest('div[class^="checkbox-wrapper"]')
    return wrapper?.querySelector('input[type="checkbox"]')
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

  #onClickBtnEdit(id) {
    this.#fireEditTicket(id)
  }

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

  #onClickTicket(id, ticket) {
    const descriptionEl = ticket.querySelector('div[class*="description-full"]')
    this.#ui.toggleDescription(descriptionEl)

    !descriptionEl.textContent && this.#fireFullDescription(id, ticket)
  }

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
      detail: { id },
    })
  }

  #getEditTicket(id) {
    return new CustomEvent('editTicket', {
      detail: { id },
    })
  }

  #getFullDescription(id, ticket) {
    return new CustomEvent('fullDescription', {
      detail: { id, ticket },
    })
  }

  #fireCheckboxChange(checkbox, id) {
    document.dispatchEvent(this.#getCheckboxChange(checkbox, id))
  }

  #fireDeleteTicket(id) {
    document.dispatchEvent(this.#getDeleteTicket(id))
  }

  #fireEditTicket(id) {
    document.dispatchEvent(this.#getEditTicket(id))
  }

  #fireFullDescription(id, ticket) {
    document.dispatchEvent(this.#getFullDescription(id, ticket))
  }
}
