# hash-route v1.0.3

[![CircleCI](https://circleci.com/gh/kt3k/hash-route.svg?style=svg)](https://circleci.com/gh/kt3k/hash-route)
[![codecov](https://codecov.io/gh/kt3k/hash-route/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/hash-route)

> Router based on hash string.

# Usage

```js
const {route, dispatch} = require('hash-route')

class Router {
  constructor () {
    $(window).on('hashchange', () => this.onHashchange())
  }

  onHashchange () {
    dispatch(this)
  }

  @route('#') root {
    location.replace('#projects')
  }

  @route('#projects') projects () {
    showAllProjectPage()
  }

  @route('#projects/:project') singleProject (params) {
    showProjectPage(params.project)
  }

  @route('*') notFound {
    showNotFoundPage()
  }

  ...
}

```

That's it!

The express style patterns are available as route paths. This library uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) under the hood. See [its document](https://www.npmjs.com/package/path-to-regexp) for available patterns.

# Install

    npm install hash-route

# License

MIT
