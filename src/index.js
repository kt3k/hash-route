const pathToRegexp = require('path-to-regexp')

/**
 * The patterns.
 */
const patterns = []

/**
 * @param {RegExp} re The pattern
 * @param {Array} keys The keys of the pattern
 * @param {string} path The path to test
 * @return {object}
 */
function matchPath(re, keys, path) {
  const result = {}

  const match = path.match(re)

  if (match == null) {
    return null
  }

  keys.forEach((keyInfo, i) => {
    result[keyInfo.name] = match[i + 1]
  })

  return result
}

/**
 * @param {string} pattern The path pattern
 * @param {object} target The target of decorator
 * @param {string} key The key name
 * @param {object} descriptor The descriptor
 */
const route = pattern => (target, key, descriptor) => {
  const method = descriptor.value

  const keys = []

  const re = pathToRegexp(pattern, keys)

  patterns.push({pattern, re, keys, method})
}

/**
 * Dispatches the route.
 * @param {object} obj The router methods host
 */
function dispatch (obj, path) {
  if (path == null) {
    path = location.hash
  }

  for (let i = 0; i < patterns.length; i++) {
    const pattern = pattern[i]

    const params = matchPath(pattern.re, pattern.keys, path)

    if (params == null) {
      continue
    }

    pattern.method.call(obj, params)

    break
  }
}

exports.route = route
exports.dispatch = dispatch
