import LocalStorage from '../Classes/LocalStorage'

describe('LocalStorage', () => {
  const localStorage = new LocalStorage('test')

  beforeEach(() => {
    localStorage.clear()
  })

  test('backup and restore', () => {
    const data = ['a', 'b']
    localStorage.backup(data)
    expect(localStorage.restore()).toEqual(data)
  })

  test('clear', () => {
    const data = ['a', 'b']
    localStorage.backup(data)
    localStorage.clear()
    expect(localStorage.restore()).toEqual([])
  })
})
