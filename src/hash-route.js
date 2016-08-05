const pathToRegexp = require('path-to-regexp')

/**
 * The route model.
 */
class HashRoute {
  /**
   * @param {string} pattern The pattern string
   * @param {RegExp} re The regexp
   * @param {object[]} keys The key informations
   */
  constructor ({pattern, re, keys, property}) {
    this.pattern = pattern
    this.re = re
    this.keys = keys
    this.property = property
  }

  /**
   * Creates the hash route object from the given pattern and property name.
   * @param {string} pattern The route pattern
   * @param {string} property The property name
   */
  static createFromPatternAndProperty (pattern, property) {
    const keys = []
    const re = pathToRegexp(pattern, keys)

    return new HashRoute({pattern, re, keys, property})
  }

  /**
   * Returns the params object if the path matches the pattern and returns null otherwise.
   * @param {string} path The path to test
   * @return {object}
   */
  match (path) {
    const result = {}

    const match = path.match(this.re)

    if (match == null) {
      return null
    }

    this.keys.forEach((keyInfo, i) => {
      result[keyInfo.name] = match[i + 1]
    })

    return result
  }

  /**
   * Tests if the path matches the route pattern.
   * @param {string} path The path
   * @return {boolean}
   */
  test (path) {
    return this.re.test(path)
  }

  /**
   * Dispatches the route with the given path.
   * @param {string} path The path
   */
  dispatch (obj, path) {
    const params = this.match(path)

    return obj[this.property](params, path, this)
  }
}

module.exports = HashRoute
