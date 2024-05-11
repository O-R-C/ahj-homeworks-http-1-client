import Ticket from '@ui/Ticket/Ticket'
import getElement from '@/js/getElement'
import BaseUI from '@/js/Classes/BaseUI'
import ConfirmDeleteForm from '../ConfirmDeleteForm/ConfirmDeleteForm'
import styles from './Tickets.module.css'

/**
 * The UI for the tickets section.
 */
export default class TicketsUI extends BaseUI {
  /**
   * Constructor.
   * @param {Element} element - The DOM element to be rendered on.
   */
  constructor(element) {
    super(element)

    this.#init()
  }

  /**
   * Initializes the component.
   */
  #init() {
    this.#addElements()
  }

  /**
   * Adds all the elements to the component.
   */
  #addElements() {
    this.#addConfirmDeleteForm()
  }

  /**
   * Creates the app element.
   * @returns {Element} - The app element.
   */
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.tickets,
    })

    this.confirmContainer = getElement({
      tag: 'dialog',
      classes: [styles.confirmContainer],
    })

    this.ticketsList = getElement({
      tag: 'div',
      classes: [styles.ticketsList],
    })

    app.append(this.confirmContainer, this.ticketsList)

    return app
  }

  /**
   * Renders the tickets list.
   * @param {Array<Ticket>} tickets - The tickets to be rendered.
   */
  renderTickets(tickets) {
    this.#clearTickets()

    if (!tickets.length) {
      this.#showNoTicket()
      return
    }

    tickets.forEach((ticket) => {
      const ticketEl = this.#getTicketElement(ticket)
      this.ticketsList.append(ticketEl)
    })
  }

  /**
   * Gets the ticket element.
   * @param {Ticket} ticket - The ticket.
   * @returns {Element} - The ticket element.
   */
  #getTicketElement(ticket) {
    return Ticket(ticket)
  }

  /**
   * Clears the tickets list.
   */
  #clearTickets() {
    this.ticketsList.innerHTML = ''
  }

  /**
   * Adds a confirm delete form to the component.
   */
  #addConfirmDeleteForm() {
    new ConfirmDeleteForm(this.confirmContainer)
  }

  /**
   * Shows a message when there are no tickets.
   */
  #showNoTicket() {
    this.ticketsList.textContent = 'Нет тикетов'
  }

  /**
   * Shows the confirm delete form.
   */
  showConfirmDeleteForm() {
    this.confirmContainer.showModal()
  }

  /**
   * Toggles the description visibility.
   * @param {Element} element - The element to toggle.
   */
  toggleDescription(element) {
    element.classList.toggle(styles.showDescription)
  }

  /**
   * Gets the description element for the given ticket.
   * @param {Ticket} ticket - The ticket.
   * @returns {Element|null} - The description element or null if not found.
   */
  getDescriptionElement(ticket) {
    return ticket.querySelector('div[class^="description-full"]')
  }
}
