import BaseUI from '@js/Classes/BaseUI'
import getElement from '@js/getElement'
import Tickets from '@components/Tickets/Tickets'
import TicketForm from '@components/TicketForm/TicketForm'
import styles from './HelpDesk.module.css'

/**
 * The UI for the help desk section.
 */
export default class HelpDeskUI extends BaseUI {
  /**
   * Creates an instance of the HelpDeskUI class.
   * @param {Element} element - The element to be used as the UI container.
   */
  constructor(element) {
    super(element)

    this.#addElements()
  }

  /**
   * Creates the app element.
   * @returns {Element} - The app element.
   */
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: [styles.helpDesk],
    })

    this.formContainer = getElement({
      tag: 'dialog',
      classes: [styles.formContainer],
    })

    this.btnAddTicket = getElement({
      tag: 'button',
      classes: [styles.btnAddTicket],
      textContent: 'Добавить тикет',
    })

    this.ticketsContainer = getElement({
      tag: 'div',
      classes: [styles.ticketsContainer],
    })

    app.append(this.formContainer, this.btnAddTicket, this.ticketsContainer)

    return app
  }

  /**
   * Adds elements to the UI.
   */
  #addElements() {
    this.#addTickets()
    this.#addTicketForm()
  }

  /**
   * Adds the tickets list to the UI.
   */
  #addTickets() {
    new Tickets(this.ticketsContainer)
  }

  /**
   * Adds the ticket form to the UI.
   */
  #addTicketForm() {
    new TicketForm(this.formContainer)
  }

  /**
   * Shows the form dialog.
   */
  showForm() {
    this.formContainer.showModal()
  }

  /**
   * Hides the form dialog.
   */
  hideForm() {
    this.formContainer.close()
  }

  /**
   * Gets the ticket values from the given ticket element.
   * @param {Element} ticket - The ticket element.
   * @returns {{ name: string, description: string }} - The ticket values.
   */
  getValues(ticket) {
    return {
      name: ticket.querySelector('div[class^="name"]').textContent,
      description: ticket.querySelector('div[class^="description-full"]').textContent,
    }
  }
}
