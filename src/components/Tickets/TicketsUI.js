import Ticket from '@ui/Ticket/Ticket'
import getElement from '@/js/getElement'
import BaseUI from '@/js/Classes/BaseUI'
import ConfirmDeleteForm from '../ConfirmDeleteForm/ConfirmDeleteForm'
import styles from './Tickets.module.css'

export default class TicketsUI extends BaseUI {
  constructor(element) {
    super(element)

    this.#init()
  }

  #init() {
    this.#addElements()
  }

  #addElements() {
    this.#addConfirmDeleteForm()
  }

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

  #getTicketElement(ticket) {
    return Ticket(ticket)
  }

  #clearTickets() {
    this.ticketsList.innerHTML = ''
  }

  #addConfirmDeleteForm() {
    new ConfirmDeleteForm(this.confirmContainer)
  }

  #showNoTicket() {
    this.ticketsList.textContent = 'Нет тикетов'
  }

  showConfirmDeleteForm() {
    this.confirmContainer.showModal()
  }
}
