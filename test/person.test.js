const assert = require('assert')
const { assertThat, equalTo } = require('hamjest')
const sinon = require('sinon')
const { Person, Network } = require('../src/shouty')

describe('Person', function () {
  const name = 'Sean'
  const range = 100
  const network = new Network(range)
  const messages = []
  const location = 10
  const credits = 0
  const sean = new Person(name, network, location, credits)

    it('is subscribed to the network', function() {
      assert.deepEqual(network._listeners,[sean])
    })

    it('has a location', function() {
      assert.equal(sean.location, 10)      
    })

    it('broadcasts shouts to the network', function() {
      const message = 'Hello world!'
      const networkStub = sinon.spy(network)
      sean.shout(message)
      assert.strictEqual(networkStub.broadcast.getCall(0).args[0],message)
    })

    it('remembers messages heard', function() {
      const message = 'Hello world!'
      const lucy = new Person('Lucy', network, 20, credits)
      sean.shout(message)
      assert.deepEqual(lucy.messagesHeard(),[message])
    })

    it('can be moved to a different location', function() {
      sean.location = 20
      assert.equal(sean.location, 20)      
    })
})
