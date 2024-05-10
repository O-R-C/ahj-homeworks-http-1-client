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
    document.addEventListener('submitTicket', this.#onSubmitTicket)
    document.addEventListener('resetForm', this.#onResetForm)
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
  }

  #onResetForm = () => {
    this.#ui.formContainer.close()
  }
}
