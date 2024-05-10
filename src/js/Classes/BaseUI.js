/**
 * BaseUI class - base class for all UI components.
 *
 * @class
 */
export default class BaseUI {
  /**
   * Constructor.
   *
   * @param {HTMLElement|string|undefined} element - element or selector of element.
   */
  constructor(element) {
    this.#checkElement(element)
    if (typeof element === 'string') {
      element = document.querySelector(element)
      !element && this.#throwError('Element not found')
    }

    this.element = element
    this.app = this.createApp()

    this.#init()
  }

  /**
   * Checks if element is a string or an instance of HTMLElement.
   *
   * @param {HTMLElement|string|undefined} element - element or selector of element.
   */
  #checkElement(element) {
    if (!element) {
      this.#throwError('Element is required')
    }

    if (!(typeof element === 'string') && !(element instanceof HTMLElement)) {
      this.#throwError('Element must be a string or HTMLElement')
    }
  }

  /**
   * Throws an error.
   *
   * @param {string} error - error message.
   */
  #throwError(error) {
    throw new Error(error)
  }

  /**
   * Initializes app.
   */
  #init() {
    this.#bindToDom()
  }

  /**
   * Binds app to DOM.
   */
  #bindToDom() {
    try {
      this.element.append(this.app)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Creates app element.
   *
   * @returns {HTMLElement} - app element.
   */
  createApp() {
    const app = document.createElement('div')
    return app
  }
}
