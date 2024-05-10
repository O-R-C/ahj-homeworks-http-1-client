import getElement from '@/js/getElement'
import styles from './Ticket.module.css'

export const Ticket = ({ name, createdAt, status, id }) => {
  const ticket = getElement({
    tag: 'div',
    classes: [styles.ticket],
    data: {
      id,
    },
  })

  const checkboxSection = getCheckbox('checkbox', status)
  const descriptionsSection = getDescriptions('descriptions', name)
  const timeSection = getDiv('time', createdAt)
  const controlsSection = getControls()

  ticket.append(checkboxSection, descriptionsSection, timeSection, controlsSection)

  return ticket
}

const getDiv = (className, textContent = '') => {
  const div = getElement({
    tag: 'div',
    classes: styles[className],
  })

  textContent && (div.textContent = textContent)

  return div
}

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

  const customCheckbox = getDiv('checkboxCustom')

  label.append(checkbox, customCheckbox)

  return getWrapper('checkboxWrapper', [label])
}

const getDescriptions = (className, text) => {
  const description = getDiv('description', text)

  const descriptionFull = getDiv('descriptionFull')

  return getWrapper('descriptionsWrapper', [description, descriptionFull])
}

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

const getWrapper = (className, element) => {
  const wrapper = getDiv(className)

  element && appendElements(wrapper, element)

  return wrapper
}

const appendElements = (wrapper, elements) => {
  Array.isArray(elements) ? wrapper.append(...elements) : wrapper.append(elements)
}

export default Ticket
