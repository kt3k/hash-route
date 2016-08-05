const HashRoute = require('./hash-route')
const HashRouteCollection = require('./hash-route-collection')

let routes

/**
 * Resets the route info.
 */
exports.reset = () => {
  routes = new HashRouteCollection()
}

exports.reset()

/**
 * @param {string} pattern The path pattern
 * @param {object} target The target of decorator
 * @param {string} key The key name
 * @param {object} descriptor The descriptor
 */
exports.route = (target, key, descriptor) => {
  if (typeof target === 'string') {
    // This is @route(routePattern) usage
    // So the first argument is the pattern string.
    const pattern = target

    return (target, key, descriptor) => {
      routes.add(HashRoute.createFromPatternAndProperty(pattern, key))
    }
  }

  // This is @route methodName() {} usage
  // Uses the key as the route pattern
  routes.add(HashRoute.createFromPatternAndProperty(key, key))
}

/**
 * Dispatches the route.
 * @param {object} obj The router methods host
 */
exports.dispatch = (obj, path) => {
  path = path || location.hash

  routes.dispatch(obj, path)
}
