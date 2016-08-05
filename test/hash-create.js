const HashRoute = require('../src/hash-route')

const {expect} = require('chai')

describe('HashRoute', () => {
  describe('match', () => {
    it('returns', () => {
      const route = HashRoute.createFromPatternAndProperty('/foo/bar', 'foo')

      expect(route.match('/bar/foo')).to.be.null
    })
  })
})
