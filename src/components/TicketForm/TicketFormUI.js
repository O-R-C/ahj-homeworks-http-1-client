import BaseUI from '@/js/Classes/BaseUI'
import getElement from '@/js/getElement'
import styles from './TicketForm.module.css'

/**
 * The UI for the ticket form.
 */
export default class TicketFormUI extends BaseUI {
  #timerEmptyField

  /**
   * Creates the form element for the ticket form.
   *
   * @return {HTMLFormElement} The form element for the ticket form.
   */
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

  /**
   * Sets the title of the form.
   *
   * @param {string} title - The title to set for the form.
   * @return {void} This function does not return anything.
   */
  setTitleForm(title) {
    this.header.textContent = title
  }

  /**
   * Handles showing an error message for an empty field.
   *
   * @param {HTMLElement} emptyField - The empty field element to display the error for.
   * @return {void} This function does not return any value.
   */
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
