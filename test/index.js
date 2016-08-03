const {reset, route, dispatch} = require('../src')

const {expect} = require('chai')

describe('route', () => {
  beforeEach(() => {
    reset()
  })

  it('registers the route pattern of the given string', done => {
    class Foo {
      page (param) {
        expect(param.bar).to.equal('ham')

        done()
      }

      hoge () {
        done(new Error('hoge should not be called'))
      }
    }

    route('hoge/:huga')(Foo.prototype, 'hoge', Object.getOwnPropertyDescriptor(Foo.prototype, 'hoge'))
    route('foo/:bar')(Foo.prototype, 'page', Object.getOwnPropertyDescriptor(Foo.prototype, 'page'))

    dispatch(new Foo(), 'foo/ham')
  })

  it('registers the route pattern of the method name if the argument is not given', done => {
    class Foo {
      'foo/:bar' (param) {
        expect(param.bar).to.equal('ham')

        done()
      }
    }

    route(Foo.prototype, 'foo/:bar', Object.getOwnPropertyDescriptor(Foo.prototype, 'foo/:bar'))

    dispatch(new Foo(), 'foo/ham')
  })
})

describe('dispatch', () => {
  it('dispatches routes with current hash if the second param is omitted', done => {
    location.href = '#foo'

    class Foo {
      foo () {
        done()
      }
    }
    route('#foo')(Foo.prototype, 'foo', Object.getOwnPropertyDescriptor(Foo.prototype, 'foo'))

    dispatch(new Foo())
  })
})
