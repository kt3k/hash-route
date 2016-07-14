const pathToRegexp = require('path-to-regexp')

/**
 * The route model.
 */
class HashRoute {
  /**
   * @param {string} pattern The pattern string
   * @param {RegExp} re The regexp
   * @param {object[]} keys The key informations
   * @param {Function} method The method
   */
  constructor ({pattern, re, keys, method}) {
    this.pattern = pattern
    this.re = re
    this.keys = keys
    this.method = method
  }

  static createFromPatternAndMethod (pattern, method) {
    const keys = []
    const re = pathToRegexp(pattern, keys)

    return new HashRoute({pattern, re, keys, method})
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

    return this.method.call(obj, params, path, this)
  }
}

module.exports = HashRoute
