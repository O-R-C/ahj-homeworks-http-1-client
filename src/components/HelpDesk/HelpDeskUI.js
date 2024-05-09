import getElement from '@/js/getElement'
import styles from './HelpDesk.module.css'

export default class HelpDeskUI {
  getElement(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }

    return element
  }

  get app() {
    const app = getElement({
      tag: 'div',
      classes: [styles.helpDesk],
    })

    return app
  }
}
