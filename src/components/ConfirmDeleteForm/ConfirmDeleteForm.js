import ConfirmDeleteFormUI from './ConfirmDeleteFormUI'

export default class ConfirmDeleteForm {
  #ui

  constructor(element) {
    this.#ui = new ConfirmDeleteFormUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  #addElements() {}

  #addEventListeners() {}
}
