import setTitle from './setTitle'

setTitle('HelpDesk')

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
