import TicketFormUI from './TicketFormUI'

export default class TicketForm {
  #ui
  #inputs
  #currentTicketId

  constructor(element) {
    this.#ui = new TicketFormUI(element)

    this.#init()
  }

  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  #addElements() {
    this.#inputs = [this.#ui.app.name, this.#ui.app.description]
  }

  #addEventListeners() {
    document.addEventListener('setTitleForm', this.#onSetTitleForm)
    document.addEventListener('closeTicketForm', this.#onCloseTicketForm)
    document.addEventListener('startEditTicket', this.#onStartEditTicket)
    this.#ui.app.addEventListener('submit', this.#onSubmit)
    this.#ui.app.addEventListener('reset', this.#onReset)
  }

  #onSubmit = (event) => {
    event.preventDefault()

    this.#hasValues() && this.#submit()
  }

  #submit() {
    const formData = new FormData(this.#ui.app)
    // formData.append('method', 'createTicket')

    this.#fireSubmitEvent(formData, this.#currentTicketId)

    this.#ui.app.reset()
  }

  #hasValues() {
    this.#trimValues()

    const emptyField = this.#inputs.find((input) => this.#isEmptyValue(input.value))
    emptyField && this.#ui.showEmptyFieldError(emptyField)

    return !emptyField
  }

  #trimValues() {
    this.#inputs.forEach((input) => (input.value = this.#trimValue(input.value)))
  }

  #trimValue(value) {
    return value.trim()
  }

  #isEmptyValue(value) {
    return !value
  }

  #getSubmitEvent(formData, id) {
    return new CustomEvent('submitTicket', { detail: { formData, id } })
  }

  #fireSubmitEvent(formData, id) {
    document.dispatchEvent(this.#getSubmitEvent(formData, id))
  }

  #onSetTitleForm = ({ detail: title }) => {
    this.#ui.setTitleForm(title)
  }

  #onReset = () => {
    this.#fireResetEvent()
  }

  #getResetEvent() {
    return new CustomEvent('resetForm')
  }

  #fireResetEvent() {
    document.dispatchEvent(this.#getResetEvent())
  }

  #onCloseTicketForm = () => {
    this.#ui.app.reset()
  }

  #onStartEditTicket = ({ detail: { id, name, description } }) => {
    this.#currentTicketId = id
    this.#ui.app.name.value = name
    this.#ui.app.description.value = description
  }
}
