/**
 * StorageArray class.
 *
 * @class
 */
export default class StorageArray {
  /**
   * Constructs a new StorageArray.
   *
   * @constructor
   * @param {Function} item - The item constructor.
   */
  constructor(item) {
    /**
     * The item constructor.
     * @type {Function}
     */
    this.item = item
  }

  /**
   * Saves an item to the storage array.
   *
   * @param {Object} item - The item to save.
   */
  saveItem(item) {
    this.storage.push(new this.item(item))
  }

  /**
   * Deletes an item from the storage array by id.
   *
   * @param {string} id - The id of the item to delete.
   */
  deleteItemById(id) {
    this.storage = this.storage.filter((item) => item.id !== id)
  }

  /**
   * Get the items in the storage array.
   *
   * @return {Array} The items in the storage array.
   */
  get items() {
    return this.storage
  }
}
