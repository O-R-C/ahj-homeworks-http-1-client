import BaseUI from '@js/Classes/BaseUI'
import getElement from '@js/getElement'
import styles from './ConfirmDeleteForm.module.css'

export default class ConfirmDeleteFormUI extends BaseUI {
  createApp() {
    const app = getElement({
      tag: 'form',
      name: 'confirmDeleteForm',
      method: 'dialog',
      classes: [styles.confirmDeleteForm],
    })

    const header = getElement({
      tag: 'h3',
      textContent: 'Удалить тикет?',
      classes: [styles.header],
    })

    const description = getElement({
      tag: 'p',
      textContent: 'Вы уверены, что хотите удалить этот тикет?\nЭто действие нельзя отменить.',
      classes: [styles.description],
    })

    const controls = getElement({
      tag: 'div',
      classes: [styles.controls],
    })

    this.btnCancel = getElement({
      tag: 'button',
      type: 'reset',
      value: 'cancel',
      textContent: 'Отмена',
      classes: [styles.btnCancel],
    })

    this.btnConfirm = getElement({
      tag: 'button',
      type: 'submit',
      value: 'confirm',
      textContent: 'Ok',
      classes: [styles.btnConfirm],
    })

    controls.append(this.btnCancel, this.btnConfirm)
    app.append(header, description, controls)
    return app
  }
}
