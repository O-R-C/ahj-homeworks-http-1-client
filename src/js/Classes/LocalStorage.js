/**
 * A class to handle storing and retrieving data from local storage.
 */
export default class LocalStorage {
  /**
   * @type {string}
   * @private
   */
  #key

  /**
   * Constructs a new LocalStorage object.
   * @param {string} key - The key to use for storing and retrieving data.
   */
  constructor(key) {
    this.#key = key
  }

  /**
   * Stores the provided storage data in local storage.
   * @param {any} storage - The data to store.
   */
  backup(storage) {
    localStorage.setItem(this.#key, JSON.stringify(storage))
  }

  /**
   * Retrieves the stored data from local storage, or an empty array if no data is found.
   * @returns {Array} - The stored data.
   */
  restore() {
    return JSON.parse(localStorage.getItem(this.#key)) || []
  }

  /**
   * Removes the stored data from local storage.
   */
  clear() {
    localStorage.removeItem(this.#key)
  }
}
