import getElement from '@/js/getElement'
import BaseUI from '@/js/Classes/BaseUI'
import styles from './Tickets.module.css'

export default class TicketsUI extends BaseUI {
  createApp() {
    const app = getElement({
      tag: 'div',
      classes: styles.tickets,
    })

    return app
  }
}
