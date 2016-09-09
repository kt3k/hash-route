# hash-route v1.2.1

[![CircleCI](https://circleci.com/gh/kt3k/hash-route.svg?style=svg)](https://circleci.com/gh/kt3k/hash-route)
[![codecov](https://codecov.io/gh/kt3k/hash-route/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/hash-route)

> A router tool based on decorator and hash string.

# Usage

You can register the route by `@route` decorator.

***Note***: You can put string literal at the method name position in es2015.

```js
const {route, dispatch} = require('hash-route')

class Router {
  constructor () {
    $(window).on('hashchange', () => dispatch(this))
  }

  @route '#' () {
    location.replace('#projects')
  }

  @route '#projects' () {
    showAllProjectPage()
  }

  @route '#projects/:project' (params) {
    showProjectPage(params.project)
  }

  @route '*' () {
    showNotFoundPage()
  }

  ...
}

```

With the above example, each time the hash string changed the registered routes are compared with `location.hash` and if it matches, the corresponding route (method) is invoked.

The express style patterns are available as route paths. This library uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) under the hood. See [its document](https://www.npmjs.com/package/path-to-regexp) for available patterns.

--

Alternatively you can pass the route pattern as the argument of `route(pattern)` like the following:

```js
class Router {

  @route('#projects/:project')
  showProjectPage (params) {
    ...
  }
```

# Install

    npm install hash-route

# License

MIT
