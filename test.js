const test = require('ava')

const createThenWhile = require('.')

test('should be able to generate a value', async t => {
  const PREFIX = 'TK'
  const tokenDoesNotExist = value => Promise.resolve(Math.random() < 0.9)
  const generateTokenStep = message =>
    Promise.resolve(`${PREFIX}${(Math.random() * 100).toString().slice(-2)}`)

  const generateToken = createThenWhile(tokenDoesNotExist, generateTokenStep)

  return t.is((await generateToken('arg')).substr(0, 2), PREFIX)
})
