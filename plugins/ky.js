import ky from 'ky'

export default ({ app }, inject) => {
  const api = ky.create({
    prefixUrl: 'https://jsonplaceholder.typicode.com/',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  inject('ky', api)
}
