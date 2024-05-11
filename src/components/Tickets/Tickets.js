import TicketsUI from './TicketsUI'

/**
 * The component for managing tickets.
 */
export default class Tickets {
  #ui
  #currentId
  #timerCheckboxChange

  /**
   * Constructor.
   * @param {Element} element - The DOM element to be rendered on.
   */
  constructor(element) {
    this.#ui = new TicketsUI(element)

    this.#init()
  }

  /**
   * Initializes the component.
   */
  #init() {
    this.#addEventListeners()
  }

  /**
   * Adds event listeners.
   */
  #addEventListeners() {
    document.addEventListener('loadedTickets', this.#onLoadedTickets)
    this.#ui.app.addEventListener('click', this.#onClick)
    this.#ui.confirmContainer.addEventListener('close', this.#onConfirmDelete)
    this.#ui.confirmContainer.addEventListener('keypress', this.#onConfirmKeyPress)
  }

  /**
   * Event handler for the loadedTickets event.
   * @param {Event} event - The event.
   */
  #onLoadedTickets = ({ detail: tickets }) => {
    this.#ui.renderTickets(tickets)
  }

  /**
   * Event handler for the click event.
   * @param {Event} event - The event.
   */
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

  /**
   * Gets the ticket element for the given target.
   * @param {Element} target - The target element.
   * @returns {Element|null} - The ticket element or null if not found.
   */
  #getTicket(target) {
    return target.closest('div[class^="ticket--"]')
  }

  /**
   * Gets the id of the ticket from the ticket element.
   * @param {Element} ticket - The ticket element.
   * @returns {string} - The id of the ticket.
   */
  #getId(ticket) {
    return ticket.dataset.id
  }

  /**
   * Checks if the target is the delete button.
   * @param {Element} target - The target element.
   * @returns {boolean} - True if it is the delete button.
   */
  #isBtnDelete(target) {
    return target.closest('button[class*="btn-delete"]')
  }

  /**
   * Checks if the target is the edit button.
   * @param {Element} target - The target element.
   * @returns {boolean} - True if it is the edit button.
   */
  #isBtnEdit(target) {
    return target.closest('button[class*="btn-edit"]')
  }

  /**
   * Checks if the target is a checkbox.
   * @param {Element} target - The target element.
   * @returns {Element|null} - The checkbox element or null if not found.
   */
  #isCheckbox(target) {
    const wrapper = target.closest('div[class^="checkbox-wrapper"]')
    return wrapper?.querySelector('input[type="checkbox"]')
  }

  /**
   * Event handler for the delete button click.
   * @param {string} id - The id of the ticket.
   */
  #onClickBtnDelete(id) {
    this.#currentId = id
    this.#ui.confirmContainer.returnValue = 'cancel'
    this.#ui.showConfirmDeleteForm()
  }

  /**
   * Event handler for the confirm delete form close event.
   * @param {Event} event - The event.
   */
  #onConfirmDelete = (event) => {
    if (event.currentTarget.returnValue === 'cancel') return

    this.#deleteTicket(this.#currentId)
  }

  /**
   * Event handler for the confirm delete form keypress event.
   * @param {Event} event - The event.
   */
  #onConfirmKeyPress = (event) => {
    if (event.key !== 'Enter') return

    event.currentTarget.returnValue = 'confirm'
    this.#onConfirmDelete(event)
  }

  /**
   * Event handler for the edit button click.
   * @param {string} id - The id of the ticket.
   * @param {Element} ticket - The ticket element.
   */
  #onClickBtnEdit(id, ticket) {
    const descriptionEl = this.#ui.getDescriptionElement(ticket)
    !descriptionEl.textContent && this.#fireFullDescription(id, ticket)

    setTimeout(() => this.#fireEditTicket(id, ticket), 100)
  }

  /**
   * Event handler for the checkbox change event.
   * @param {Element} checkbox - The checkbox element.
   * @param {string} id - The id of the ticket.
   */
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

  /**
   * Event handler for the ticket click event.
   * @param {string} id - The id of the ticket.
   * @param {Element} ticket - The ticket element.
   */
  #onClickTicket(id, ticket) {
    const descriptionEl = this.#ui.getDescriptionElement(ticket)
    this.#ui.toggleDescription(descriptionEl)

    !descriptionEl.textContent && this.#fireFullDescription(id, ticket)
  }

  /**
   * Deletes the ticket with the given id.
   * @param {string} id - The id of the ticket.
   */
  #deleteTicket(id) {
    this.#fireDeleteTicket(id)
  }

  /**
   * Fires the checkboxChange event.
   * @param {Element} checkbox - The checkbox element.
   * @param {string} id - The id of the ticket.
   */
  #getCheckboxChange(checkbox, id) {
    return new CustomEvent('checkboxChange', {
      detail: { status: checkbox.checked, id },
    })
  }

  /**
   * Fires the deleteTicket event.
   * @param {string} id - The id of the ticket.
   */
  #getDeleteTicket(id) {
    return new CustomEvent('deleteTicket', {
      detail: { id },
    })
  }

  /**
   * Fires the deleteTicket event.
   * @param {string} id - The id of the ticket.
   * @param {Element} ticket - The ticket element.
   */
  #getEditTicket(id, ticket) {
    return new CustomEvent('editTicket', {
      detail: { id, ticket },
    })
  }

  /**
   * Fires the fullDescription event.
   */
  #getFullDescription(id, ticket) {
    return new CustomEvent('fullDescription', {
      detail: { id, ticket },
    })
  }

  /**
   * Fires the checkboxChange event.
   * @param {Element} checkbox - The checkbox element.
   * @param {string} id - The id of the ticket.
   */
  #fireCheckboxChange(checkbox, id) {
    document.dispatchEvent(this.#getCheckboxChange(checkbox, id))
  }

  /**
   * Fires the deleteTicket event.
   * @param {string} id - The id of the ticket.
   */
  #fireDeleteTicket(id) {
    document.dispatchEvent(this.#getDeleteTicket(id))
  }

  /**
   * Fires the editTicket event.
   * @param {string} id - The id of the ticket.
   * @param {Element} ticket - The ticket element.
   */
  #fireEditTicket(id, ticket) {
    document.dispatchEvent(this.#getEditTicket(id, ticket))
  }

  /**
   * Fires the fullDescription event.
   * @param {string} id - The id of the ticket.
   * @param {Element} ticket - The ticket element.
   */
  #fireFullDescription(id, ticket) {
    document.dispatchEvent(this.#getFullDescription(id, ticket))
  }
}
