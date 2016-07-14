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
exports.route = pattern => (target, key, descriptor) => {
  routes.add(HashRoute.createFromPatternAndMethod(pattern, descriptor.value))
}

/**
 * Dispatches the route.
 * @param {object} obj The router methods host
 */
exports.dispatch = (obj, path) => {
  path = path || location.hash

  routes.dispatch(obj, path)
}
