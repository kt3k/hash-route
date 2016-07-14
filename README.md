# hash-route v1.0.1

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

# License

MIT
