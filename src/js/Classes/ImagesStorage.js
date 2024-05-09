import ImagesItem from './ImagesItem'
import StorageArray from './StorageArray'
import LocalStorage from './LocalStorage'

/**
 * Class representing a storage for images.
 * @extends StorageArray
 */
export default class ImagesStorage extends StorageArray {
  /**
   * Constructs a new ImagesStorage.
   *
   * @param {string} key - The key for local storage.
   */
  constructor(key) {
    super(ImagesItem)
    this.local = new LocalStorage(key)
    this.storage = this.local.restore()
  }

  /**
   * Saves an image to the storage.
   *
   * @param {Object} image - The image to save.
   * @param {string} image.name - The name of the image.
   * @param {string} image.url - The URL of the image.
   * @param {string} [image.id] - The ID of the image. If not provided,
   * a UUID will be generated.
   */
  saveImage(image) {
    super.saveItem(image)
    // this.local.backup(this.images)
  }

  /**
   * Deletes an image from the storage by id.
   *
   * @param {string} id - The id of the image to delete.
   */
  deleteImageById(id) {
    super.deleteItemById(id)
    // this.local.backup(this.images)
  }

  /**
   * Get the images in the storage.
   *
   * @return {Array} The images in the storage.
   */
  get images() {
    return super.items
  }

  /**
   * Get the last image from the images array.
   *
   * @return {Object} The last image object from the images array.
   */
  get lastImage() {
    return this.images.at(-1)
  }
}
