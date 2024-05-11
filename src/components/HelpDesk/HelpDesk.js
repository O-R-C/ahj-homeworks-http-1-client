import HelpDeskUI from './HelpDeskUI'

export default class HelpDesk {
  #url = 'http://localhost:3000/tickets'
  #ui

  /**
   * Creates an instance of the HelpDesk class.
   *
   * @param {Element} element - The element to initialize the HelpDesk with.
   */
  constructor(element) {
    this.#ui = new HelpDeskUI(element)

    this.#init()
  }
  /**
   * Initializes the HelpDesk component.
   */
  #init() {
    this.#addEventListeners()

    this.#loadAllTickets()
  }

  /**
   * Adds event listeners for the help desk component.
   */
  #addEventListeners() {
    document.addEventListener('resetForm', this.#onResetForm)
    document.addEventListener('editTicket', this.#onEditTicket)
    document.addEventListener('submitTicket', this.#onSubmitTicket)
    document.addEventListener('deleteTicket', this.#onDeleteTicket)
    document.addEventListener('checkboxChange', this.#onCheckboxChange)
    document.addEventListener('fullDescription', this.#onFullDescription)
    this.#ui.btnAddTicket.addEventListener('click', this.#onClickAddTicket)
    this.#ui.formContainer.addEventListener('close', this.#onCloseTicketForm)
  }

  /**
   * Loads all tickets from the server.
   */
  #loadAllTickets = async () => {
    const tickets = await this.#fetchData(this.#url)

    // if (!tickets) return

    this.#fireLoadedTicketsEvent(tickets)
  }

  /**
   * Fetches data from the server.
   *
   * @param {string} url - The URL to fetch from.
   * @param {Object} [options] - Fetch options.
   * @param {Object<string, *>} [options.headers] - Fetch headers.
   * @param {Object<string, *>} [options.body] - Fetch body.
   * @param {RequestInit} [options.method] - Fetch method.
   *
   * @returns {Promise<Object>} - The fetched data.
   */
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

  /**
   * Creates an event with the loaded tickets.
   *
   * @param {Array<Object>} tickets - The loaded tickets.
   * @returns {CustomEvent} The event with the tickets.
   */
  #getLoadedTickets(tickets) {
    return new CustomEvent('loadedTickets', { detail: tickets })
  }

  /**
   * Dispatches the event with the loaded tickets.
   *
   * @param {Array<Object>} tickets - The loaded tickets.
   */
  #fireLoadedTicketsEvent(tickets) {
    document.dispatchEvent(this.#getLoadedTickets(tickets))
  }

  /**
   * Handles adding a new ticket.
   */
  #onClickAddTicket = () => {
    this.#fireSetTitleForm('Добавить тикет')
    this.#ui.showForm()
  }

  /**
   * Creates an event to set the title of the form.
   *
   * @param {string} title - The title to set.
   * @returns {CustomEvent} The event with the title.
   */
  #getSetTitleForm(title) {
    return new CustomEvent('setTitleForm', { detail: title })
  }

  /**
   * Handles editing a ticket.
   *
   * @param {Object} event - The event with the ticket to edit.
   */
  #onEditTicket = (event) => {
    this.#fireSetTitleForm('Изменить тикет')
    this.#fireStartEditTicket(event.detail)
    this.#ui.showForm()
  }

  /**
   * Dispatches the event to set the title of the form.
   *
   * @param {string} title - The title to set.
   */
  #fireSetTitleForm(title) {
    document.dispatchEvent(this.#getSetTitleForm(title))
  }

  /**
   * Creates an event to start editing a ticket.
   *
   * @param {Object} props - The props of the event.
   * @prop {number} id - The id of the ticket to edit.
   * @prop {Object} ticket - The ticket to edit.
   * @returns {CustomEvent} The event with the ticket to edit.
   */
  #getStartEditTicket({ id, ticket }) {
    const { name, description } = this.#ui.getValues(ticket)
    return new CustomEvent('startEditTicket', { detail: { id, name, description } })
  }

  /**
   * Dispatches the event to start editing a ticket.
   *
   * @param {Object} props - The props of the event.
   * @see HelpDesk#getStartEditTicket
   */
  #fireStartEditTicket(props) {
    document.dispatchEvent(this.#getStartEditTicket(props))
  }

  /**
   * Handles the form submission.
   *
   * @param {Object} event - The event with the form data and ticket id.
   * @property {Object} detail - The object with the form data and ticket id.
   * @property {number} detail.id - The id of the ticket to update or null if it's a new ticket.
   * @property {FormData} detail.formData - The form data.
   */
  #onSubmitTicket = (event) => {
    event.preventDefault()

    const { id, formData } = event.detail

    if (id) {
      // Update the ticket.
      this.#fetchData(`${this.#url}/${id}`, {
        method: 'PATCH',
        body: formData,
      })
    }

    if (!id) {
      // Create a new ticket.
      formData.append('method', 'createTicket')

      this.#fetchData(this.#url, {
        method: 'POST',
        body: formData,
      })
    }

    this.#ui.formContainer.close()

    setTimeout(() => {
      // Reload all tickets after a short delay to make sure the server responds.
      this.#loadAllTickets()
    }, 1000)
  }

  /**
   * Handles the form reset.
   */
  #onResetForm = () => {
    this.#ui.hideForm()
  }

  /**
   * Handles closing the form.
   */
  #onCloseTicketForm = () => {
    this.#fireCloseTicketFormEvent()
  }

  /**
   * Creates an event to close the form.
   *
   * @returns {CustomEvent} The event to close the form.
   */
  #getCloseTicketFormEvent() {
    return new CustomEvent('closeTicketForm')
  }

  /**
   * Dispatches the event to close the form.
   */
  #fireCloseTicketFormEvent() {
    document.dispatchEvent(this.#getCloseTicketFormEvent())
  }

  /**
   * Handles the checkbox change.
   *
   * @param {Object} event - The event with the checkbox data.
   * @property {Object} detail - The object with the checkbox data.
   * @property {number} detail.id - The id of the ticket.
   * @property {boolean} detail.status - The new status of the ticket.
   */
  #onCheckboxChange = (event) => {
    const { id, status } = event.detail
    const formData = new FormData()
    formData.set('status', JSON.stringify(status))

    this.#fetchData(`${this.#url}/${id}`, {
      method: 'PATCH',
      body: formData,
    })
  }

  /**
   * Handles deleting a ticket.
   *
   * @param {Object} event - The event with the ticket id.
   * @property {Object} detail - The object with the ticket id.
   * @property {number} detail.id - The id of the ticket to delete.
   */
  #onDeleteTicket = ({ detail: { id } }) => {
    this.#fetchData(`${this.#url}/${id}`, {
      method: 'DELETE',
    })

    setTimeout(() => {
      this.#loadAllTickets()
    }, 1000)
  }

  /**
   * Handles opening the full description.
   *
   * @param {Object} event - The event with the ticket id.
   * @property {Object} detail - The object with the ticket id.
   * @property {number} detail.id - The id of the ticket to get the description.
   * @property {Object} detail.ticket - The ticket to get the description.
   */
  #onFullDescription = async ({ detail: { id, ticket } }) => {
    const description = await this.#fetchData(`${this.#url}/${id}`)

    if (!description) return

    ticket.querySelector('div[class^="description-full"]').textContent = description
  }
}
