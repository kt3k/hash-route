const {reset, route, dispatch} = require('../src')

const {expect} = require('chai')

describe('route', () => {
  beforeEach(() => {
    reset()
  })

  it('registers the route pattern of the method name if the argument is not given', done => {
    class Foo {
      'foo/:bar' (param) {
        expect(param.bar).to.equal('ham')

        done()
      }
    }

    route({ key: 'foo/:bar' })

    dispatch(new Foo(), 'foo/ham')
  })
})

describe('dispatch', () => {
  it('dispatches routes with current hash if the second param is omitted', done => {
    location.href = '#foo'

    class Foo {
      '#foo' () {
        done()
      }
    }
    route({ key: '#foo' })
    dispatch(new Foo())
  })
})
