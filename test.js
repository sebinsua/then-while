const test = require('ava')
const sinon = require('sinon')

const createThenWhile = require('.')

test('should be able to generate a value', async t => {
  const PREFIX = 'TK'
  const tokenDoesNotExist = value => Promise.resolve(Math.random() < 0.9)
  const generateTokenStep = message =>
    Promise.resolve(`${PREFIX}${(Math.random() * 100).toString().slice(-2)}`)

  const generateToken = createThenWhile(tokenDoesNotExist, generateTokenStep)

  return t.is((await generateToken('arg')).substr(0, 2), PREFIX)
})

test('should repeatedly call the predicate and step while the predicate is true', async t => {
  const predicate = sinon.stub()
  predicate.onCall(0).returns(true)
  predicate.onCall(1).returns(true)
  predicate.onCall(2).returns(true)
  predicate.onCall(3).returns(true)
  predicate.onCall(4).returns(true)
  predicate.onCall(5).returns(false)

  const step = sinon.stub()
  step.onCall(0).returns('TK1')
  step.onCall(1).returns('TK2')
  step.onCall(2).returns('TK3')
  step.onCall(3).returns('TK4')
  step.onCall(4).returns('TK5')
  step.onCall(5).returns('TK6')

  const predicateUntil = createThenWhile(predicate, step)

  const finalValue = await predicateUntil()

  t.is(predicate.callCount, 6)
  t.is(step.callCount, 6)
  t.is(finalValue, 'TK6')
})
