import getElement from '@/js/getElement'
import BaseUI from '@/js/Classes/BaseUI'
import Ticket from '@ui/Ticket/Ticket'
import styles from './Tickets.module.css'

export default class TicketsUI extends BaseUI {
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.tickets,
    })

    return app
  }

  renderTickets(tickets) {
    this.#clearTickets()

    tickets.forEach((ticket) => {
      const ticketEl = this.#getTicketElement(ticket)
      this.app.append(ticketEl)
    })
  }

  #getTicketElement(ticket) {
    return Ticket(ticket)
  }

  #clearTickets() {
    this.app.innerHTML = ''
  }
}
