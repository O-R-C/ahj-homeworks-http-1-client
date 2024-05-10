import BaseUI from '@js/Classes/BaseUI'
import getElement from '@js/getElement'
import Tickets from '@components/Tickets/Tickets'
import TicketForm from '@components/TicketForm/TicketForm'
import styles from './HelpDesk.module.css'

export default class HelpDeskUI extends BaseUI {
  constructor(element) {
    super(element)

    this.#addElements()
  }
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: [styles.helpDesk],
    })

    const formContainer = getElement({
      tag: 'div',
      classes: [styles.formContainer],
    })

    const btnAddTicket = getElement({
      tag: 'button',
      classes: [styles.btnAddTicket],
      textContent: 'Add Ticket',
    })

    this.ticketsContainer = getElement({
      tag: 'div',
      classes: [styles.ticketsContainer],
    })

    app.append(formContainer, btnAddTicket, this.ticketsContainer)

    return app
  }

  #addElements() {
    this.#addTickets()
    this.#addTicketForm()
  }

  #addTickets() {
    new Tickets(this.ticketsContainer)
  }

  #addTicketForm() {
    new TicketForm(this.element)
  }
}
