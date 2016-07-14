# hash-route v1.0.0

> Router based on hash string.

# Usage

```js
const route = require('hash-route')

class Router {
  constructor () {
    $(window).on('hashchange', () => this.onHashchange())
  }

  onHashchange () {
    route(this)
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

# License

MIT
