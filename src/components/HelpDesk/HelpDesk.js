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
    document.addEventListener('resetForm', this.#onResetForm)
    document.addEventListener('submitTicket', this.#onSubmitTicket)
    document.addEventListener('checkboxChange', this.#onCheckboxChange)
    document.addEventListener('deleteTicket', this.#onDeleteTicket)
    this.#ui.btnAddTicket.addEventListener('click', this.#onClickAddTicket)
    this.#ui.formContainer.addEventListener('close', this.#onCloseTicketForm)
  }

  #loadAllTickets = async () => {
    const tickets = await this.#fetchData(this.#url)

    if (!tickets) return

    this.#fireLoadedTicketsEvent(tickets)
  }

  #fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  #getLoadedTickets(tickets) {
    return new CustomEvent('loadedTickets', { detail: tickets })
  }

  #fireLoadedTicketsEvent(tickets) {
    document.dispatchEvent(this.#getLoadedTickets(tickets))
  }

  #onClickAddTicket = () => {
    this.#fireSetTitleForm('Добавить тикет')
    this.#ui.showForm()
  }

  #getSetTitleForm(title) {
    return new CustomEvent('setTitleForm', { detail: title })
  }

  #fireSetTitleForm(title) {
    document.dispatchEvent(this.#getSetTitleForm(title))
  }

  #onSubmitTicket = (event) => {
    event.preventDefault()

    this.#fetchData(this.#url, {
      method: 'POST',
      body: event.detail,
    })

    this.#ui.formContainer.close()
    this.#loadAllTickets()
  }

  #onResetForm = () => {
    this.#ui.hideForm()
  }

  #onCloseTicketForm = () => {
    this.#fireCloseTicketFormEvent()
  }

  #getCloseTicketFormEvent() {
    return new CustomEvent('closeTicketForm')
  }

  #fireCloseTicketFormEvent() {
    document.dispatchEvent(this.#getCloseTicketFormEvent())
  }

  #onCheckboxChange = (event) => {
    this.#fetchData(this.#url, {
      method: 'PATCH',
      body: JSON.stringify(event.detail),
    })
  }

  #onDeleteTicket = (event) => {
    console.log('🚀 ~ event:', event)
    this.#fetchData(this.#url, {
      method: 'DELETE',
      body: JSON.stringify(event.detail),
    })
  }
}
