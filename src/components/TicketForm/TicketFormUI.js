import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import styles from './TicketForm.module.css'

export default class TicketFormUI extends BaseUI {
  #timerEmptyField

  createApp() {
    const app = getElement({
      tag: 'form',
      name: 'ticketForm',
      classes: [styles.ticketForm],
    })

    this.header = getElement({
      tag: 'h3',
      textContent: 'Добавить тикет',
      classes: [styles.header],
    })

    const nameLabel = getElement({
      tag: 'label',
      textContent: 'Краткое описание',
      classes: [styles.nameLabel],
    })

    const nameInput = getElement({
      tag: 'input',
      type: 'text',
      name: 'name',
      required: true,
      autofocus: true,
      placeholder: 'Краткое описание',
      classes: [styles.nameInput],
    })

    const descriptionLabel = getElement({
      tag: 'label',
      textContent: 'Подробное описание',
      classes: [styles.descriptionLabel],
    })

    const descriptionInput = getElement({
      tag: 'textarea',
      name: 'description',
      rows: '5',
      required: true,
      placeholder: 'Подробное описание',
      classes: [styles.descriptionInput],
    })

    const controls = getElement({
      tag: 'div',
      classes: [styles.controls],
    })

    this.btnCancel = getElement({
      tag: 'button',
      type: 'reset',
      textContent: 'Отмена',
      classes: [styles.btnCancel],
    })

    this.btnSubmit = getElement({
      tag: 'button',
      type: 'submit',
      textContent: 'Ok',
      classes: [styles.btnSubmit],
    })

    nameLabel.append(nameInput)
    descriptionLabel.append(descriptionInput)
    controls.append(this.btnCancel, this.btnSubmit)
    app.append(this.header, nameLabel, descriptionLabel, controls)

    return app
  }

  setTitleForm(title) {
    this.header.textContent = title
  }

  showEmptyFieldError(emptyField) {
    if (this.#timerEmptyField) {
      clearTimeout(this.timerEmptyField)
    }

    emptyField.classList.add(styles.error)
    emptyField.placeholder = 'Поле не может быть пустым'
    emptyField.focus()

    this.#timerEmptyField = setTimeout(() => {
      emptyField.classList.remove(styles.error)
    }, 1000)
  }
}
