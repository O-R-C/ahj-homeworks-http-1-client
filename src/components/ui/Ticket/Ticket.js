import getElement from '@/js/getElement'
import styles from './Ticket.module.css'

/**
 * Creates a ticket element with the given name, createdAt, status, and id.
 *
 * @param {Object} props - The properties of the ticket.
 * @param {string} props.name - The name of the ticket.
 * @param {string} props.createdAt - The creation date of the ticket.
 * @param {boolean} props.status - The status of the ticket.
 * @param {string} props.id - The id of the ticket.
 * @return {HTMLElement} The ticket element.
 */
export const Ticket = ({ name, createdAt, status, id }) => {
  const ticket = getElement({
    tag: 'div',
    classes: [styles.ticket],
    data: {
      id,
    },
  })

  const checkboxSection = getCheckbox('checkbox', status)
  const nameSection = getDiv('name', name)
  const timeSection = getDiv('time', createdAt)
  const controlsSection = getControls()
  const description = getDiv('description-full')

  const ticketShort = getWrapper('ticket-short', [checkboxSection, nameSection, timeSection, controlsSection])

  ticket.append(ticketShort, description)

  return ticket
}

/**
 * Creates a div element with the specified class and optional text content.
 *
 * @param {string} className - The class name for the div element.
 * @param {string} [textContent=''] - The text content to be added to the div element.
 * @return {HTMLElement} The created div element.
 */
const getDiv = (className, textContent = '') => {
  const div = getElement({
    tag: 'div',
    classes: styles[className],
  })

  textContent && (div.textContent = textContent)

  return div
}

/**
 * Creates a checkbox element with the specified class and status.
 *
 * @param {string} className - The class name for the checkbox.
 * @param {boolean} status - The status of the checkbox.
 * @return {HTMLElement} The created checkbox element wrapped in a wrapper.
 */
const getCheckbox = (className, status) => {
  const label = getElement({
    tag: 'label',
  })

  const checkbox = getElement({
    tag: 'input',
    type: 'checkbox',
    checked: status,
    classes: styles[className],
  })
  checkbox.savedStatus = status

  const customCheckbox = getDiv('checkboxCustom')

  label.append(checkbox, customCheckbox)

  return getWrapper('checkboxWrapper', [label])
}

/**
 * Returns an HTML element that contains two buttons: one for editing and one for deleting.
 *
 * @return {HTMLElement} An HTML element with the class 'controlsWrapper' that contains two buttons: 'btnEdit' and 'btnDelete'.
 */
const getControls = () => {
  const btnEdit = getElement({
    tag: 'button',
    classes: styles.btnEdit,
  })

  const btnDelete = getElement({
    tag: 'button',
    classes: styles.btnDelete,
  })

  return getWrapper('controlsWrapper', [btnEdit, btnDelete])
}

/**
 * Creates a wrapper element with the specified class and optional child elements.
 *
 * @param {string} className - The class name for the wrapper element.
 * @param {HTMLElement[]} element - The child elements to be added to the wrapper.
 * @return {HTMLElement} The created wrapper element.
 */
const getWrapper = (className, element) => {
  const wrapper = getDiv(className)

  element && appendElements(wrapper, element)

  return wrapper
}

/**
 * Appends elements to a wrapper based on their type.
 *
 * @param {HTMLElement} wrapper - The element to which elements will be appended.
 * @param {(HTMLElement|HTMLElement[])} elements - The element(s) to append to the wrapper.
 * @return {void} No return value.
 */
const appendElements = (wrapper, elements) => {
  Array.isArray(elements) ? wrapper.append(...elements) : wrapper.append(elements)
}

export default Ticket
