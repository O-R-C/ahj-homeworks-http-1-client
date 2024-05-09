import getElement from '@/js/getElement'
import BaseUI from '@/js/Classes/BaseUI'
import styles from './HelpDesk.module.css'

export default class HelpDeskUI extends BaseUI {
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

    const ticketsContainer = getElement({
      tag: 'div',
      classes: [styles.ticketsContainer],
    })

    app.append(formContainer, btnAddTicket, ticketsContainer)

    return app
  }
}
