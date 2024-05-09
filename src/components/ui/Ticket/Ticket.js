import getElement from '@/js/getElement'
import styles from './Ticket.module.css'

export const Ticket = ({ desc, time }) => {
  const checkboxSection = getCheckbox('checkbox')
  const descriptionsSection = getDescriptions('descriptions', desc)
  const timeSection = getDiv('time', time)
  const controlsSection = getControls()

  return getWrapper('ticket', [checkboxSection, descriptionsSection, timeSection, controlsSection])
}

const getDiv = (className, textContent = '') => {
  const div = getElement({
    tag: 'div',
    classes: styles[className],
  })

  textContent && (div.textContent = textContent)

  return div
}

const getCheckbox = (className) => {
  const checkbox = getElement({
    tag: 'input',
    type: 'checkbox',
    classes: styles[className],
  })

  return getWrapper('checkboxWrapper', checkbox)
}

const getDescriptions = (className, text) => {
  const description = getDiv('description', text)

  const descriptionFull = getDiv('descriptionFull')

  return getWrapper('descriptionsWrapper', [description, descriptionFull])
}

const getControls = () => {
  const btnEdit = getElement({
    tag: 'button',
    textContent: 'Edit',
    classes: styles.btnEdit,
  })

  const btnDelete = getElement({
    tag: 'button',
    textContent: 'Delete',
    classes: styles.btnDelete,
  })

  return getWrapper('controlsWrapper', [btnEdit, btnDelete])
}

const getWrapper = (className, element) => {
  const wrapper = getDiv(className)

  element && wrapper.appendElements(element)

  return wrapper
}

const appendElements = (elements) => {
  Array.isArray(elements) ? this.append(...elements) : this.append(elements)
}

export default Ticket
