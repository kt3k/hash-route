/**
 * Returns the object from the given array which sutisfies the given predicate first.
 * @param {object[]} array The array to test
 * @param {Function} predicate The predicate
 */
const first = (array, predicate) => {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return array[i]
    }
  }
}

/**
 * The collection model of HashRoutes.
 */
class HashRouteCollection {
  constructor () {
    this.routes = []
  }

  /**
   * @param {HashRoute}
   */
  add (route) {
    this.routes.push(route)
  }

  /**
   * @param {object} obj The object
   * @param {string} path The path
   */
  dispatch (obj, path) {
    const route = this.first(path)

    if (route == null) {
      return
    }

    route.dispatch(obj, path)
  }

  first (path) {
    return first(this.routes, route => route.test(path))
  }
}

module.exports = HashRouteCollection
