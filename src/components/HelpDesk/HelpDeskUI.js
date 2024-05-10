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

  #addElements() {
    this.#addTickets()
    this.#addTicketForm()
  }

  #addTickets() {
    new Tickets(this.ticketsContainer)
  }

  #addTicketForm() {
    new TicketForm(this.formContainer)
  }

  showForm() {
    this.formContainer.showModal()
  }

  hideForm() {
    this.formContainer.close()
  }
}
