'use strict'

const assert = require('assert')
const smokesignals = require('smokesignals')
const Trailpack = require('trailpack')
const lib = require('../../lib')

describe('lib.Errors', () => {
  it('all Error types should be global', () => {
    assert(global.ConfigNotDefinedError)
    assert(global.LoggerNotDefinedError)
    assert(global.ApiNotDefinedError)
    assert(global.ConfigValueError)
    assert(global.PackageNotDefinedError)
    assert(global.IllegalAccessError)
    assert(global.TimeoutError)
    assert(global.GraphCompletenessError)
    assert(global.NamespaceConflictError)
    assert(global.ValidationError)
    assert(global.TrailpackError)
  })

  describe('ConfigNotDefinedError', () => {
    it('#name', () => {
      const err = new ConfigNotDefinedError()
      assert.equal(err.name, 'ConfigNotDefinedError')
    })
  })
  describe('LoggerNotDefinedError', () => {
    it('#name', () => {
      const err = new LoggerNotDefinedError()
      assert.equal(err.name, 'LoggerNotDefinedError')
    })
  })
  describe('ApiNotDefinedError', () => {
    it('#name', () => {
      const err = new ApiNotDefinedError()
      assert.equal(err.name, 'ApiNotDefinedError')
    })
  })
  describe('ConfigValueError', () => {
    it('#name', () => {
      const err = new ConfigValueError()
      assert.equal(err.name, 'ConfigValueError')
    })
  })
  describe('PackageNotDefinedError', () => {
    it('#name', () => {
      const err = new PackageNotDefinedError()
      assert.equal(err.name, 'PackageNotDefinedError')
    })
  })
  describe('IllegalAccessError', () => {
    it('#name', () => {
      const err = new IllegalAccessError()
      assert.equal(err.name, 'IllegalAccessError')
    })
  })
  describe('TimeoutError', () => {
    it('#name', () => {
      const err = new TimeoutError()
      assert.equal(err.name, 'TimeoutError')
    })
  })
  describe('GraphCompletenessError', () => {
    it('#name', () => {
      const err = new GraphCompletenessError()
      assert.equal(err.name, 'GraphCompletenessError')
    })
  })
  describe('NamespaceConflictError', () => {
    it('#name', () => {
      const err = new NamespaceConflictError()
      assert.equal(err.name, 'NamespaceConflictError')
    })
  })
  describe('ValidationError', () => {
    it('#name', () => {
      const err = new ValidationError()
      assert.equal(err.name, 'ValidationError')
    })
    describe('#message', () => {
      it('should specifiy missing/undefined trailpacks', () => {
        const testConfig = {
          main: {
            packs: [
              undefined
            ]
          },
          log: {
            logger: new smokesignals.Logger('silent')
          }
        }

        try {
          lib.Configuration.validateConfig(testConfig)
        }
        catch (e) {
          console.log(e)
          assert(/The following configuration values are invalid/.test(e.message))
          assert(/main.packs\[0\]/.test(e.message))
        }
      })

    })
  })
  describe('TrailpackError', () => {
    it('#name', () => {
      const err = new TrailpackError()
      assert.equal(err.name, 'TrailpackError')
    })
    describe('#message', () => {
      it('should specify the failed trailpack and stage', () => {
        const Failpack = class Failpack extends Trailpack { }
        const err = new TrailpackError(Failpack, new Error(), 'constructor')

        assert(/trailpack failed/.test(err.message))
        assert(/"constructor"/.test(err.message))
        assert(/Failpack trailpack/.test(err.message))
      })
    })
  })
})

