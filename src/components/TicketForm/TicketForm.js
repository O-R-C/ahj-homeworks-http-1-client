import TicketFormUI from './TicketFormUI'

/**
 * The UI for the ticket form.
 */
export default class TicketForm {
  #ui
  #inputs
  #currentTicketId

  /**
   * Creates an instance of the TicketForm class.
   * @param {Element} element - The element to be used as the UI container.
   */
  constructor(element) {
    this.#ui = new TicketFormUI(element)

    this.#init()
  }

  /**
   * Initializes the ticket form.
   */
  #init() {
    this.#addElements()
    this.#addEventListeners()
  }

  /**
   * Adds elements to the UI.
   */
  #addElements() {
    this.#inputs = [this.#ui.app.name, this.#ui.app.description]
  }

  /**
   * Adds event listeners to the UI.
   */
  #addEventListeners() {
    document.addEventListener('setTitleForm', this.#onSetTitleForm)
    document.addEventListener('closeTicketForm', this.#onCloseTicketForm)
    document.addEventListener('startEditTicket', this.#onStartEditTicket)
    this.#ui.app.addEventListener('submit', this.#onSubmit)
    this.#ui.app.addEventListener('reset', this.#onReset)
  }

  /**
   * Handles the submit event.
   * @param {Event} event - The event object.
   */
  #onSubmit = (event) => {
    event.preventDefault()

    this.#hasValues() && this.#submit()
  }

  /**
   * Submits the ticket form.
   */
  #submit() {
    const formData = new FormData(this.#ui.app)

    this.#fireSubmitEvent(formData, this.#currentTicketId)

    this.#ui.app.reset()
  }

  /**
   * Checks if the form has values.
   *
   * @return {boolean} Whether the form has values.
   */
  #hasValues() {
    this.#trimValues()

    const emptyField = this.#inputs.find((input) => this.#isEmptyValue(input.value))
    emptyField && this.#ui.showEmptyFieldError(emptyField)

    return !emptyField
  }

  /**
   * Trims the form values.
   */
  #trimValues() {
    this.#inputs.forEach((input) => (input.value = this.#trimValue(input.value)))
  }

  /**
   * Trims a value.
   * @param {string} value - The value to trim.
   * @return {string} The trimmed value.
   */
  #trimValue(value) {
    return value.trim()
  }

  /**
   * Checks if a value is empty.
   * @param {string} value - The value to check.
   * @return {boolean} Whether the value is empty.
   */
  #isEmptyValue(value) {
    return !value
  }

  /**
   * Gets the submit event.
   * @param {object} formData - The form data.
   * @param {number} id - The ticket id.
   * @return {CustomEvent} The submit event.
   */
  #getSubmitEvent(formData, id) {
    return new CustomEvent('submitTicket', { detail: { formData, id } })
  }

  /**
   * Dispatches the submit event.
   * @param {object} formData - The form data.
   * @param {number} id - The ticket id.
   */
  #fireSubmitEvent(formData, id) {
    document.dispatchEvent(this.#getSubmitEvent(formData, id))
  }

  /**
   * Handles the title form event.
   * @param {{ detail: string }} event - The event object.
   */
  #onSetTitleForm = ({ detail: title }) => {
    this.#ui.setTitleForm(title)
  }

  /**
   * Handles the reset form event.
   */
  #onReset = () => {
    this.#fireResetEvent()
  }

  /**
   * Gets the reset event.
   * @return {CustomEvent} The reset event.
   */
  #getResetEvent() {
    return new CustomEvent('resetForm')
  }

  /**
   * Dispatches the reset event.
   */
  #fireResetEvent() {
    document.dispatchEvent(this.#getResetEvent())
  }

  /**
   * Handles the close ticket form event.
   */
  #onCloseTicketForm = () => {
    this.#ui.app.reset()
  }

  /**
   * Handles the start edit ticket event.
   * @param {{ detail: { id: number, name: string, description: string } }} event - The event object.
   */
  #onStartEditTicket = ({ detail: { id, name, description } }) => {
    this.#currentTicketId = id
    this.#ui.app.name.value = name
    this.#ui.app.description.value = description
  }
}
