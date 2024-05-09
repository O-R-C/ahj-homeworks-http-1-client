import setTitle from './setTitle'
import HelpDesk from '@/components/HelpDesk/HelpDesk'

setTitle('HelpDesk')

new HelpDesk('body')

const fetchData = async () => {
  return await fetch('http://localhost:3000/test/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'John', age: 30 }),
  })
    .then((response) => response.json())
    .then((data) => logResponse(data))
}

const logResponse = (response) => {
  console.log(response)
}

fetchData()

import Ticket from '@/components/ui/Ticket/Ticket'

const ticket = Ticket({
  desc: 'desc',
  time: 'time',
})

document.body.append(ticket)
