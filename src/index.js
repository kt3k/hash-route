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
 * @param {Object} descriptor The element descriptor
 */
exports.route = descriptor => {
  const { key } = descriptor

  routes.add(HashRoute.createFromPatternAndProperty(key, key))
}

/**
 * Dispatches the route.
 * @param {Object} obj The router methods host
 */
exports.dispatch = (obj, path) => {
  path = path || location.hash.replace(/^#/, '')

  routes.dispatch(obj, path)
}
