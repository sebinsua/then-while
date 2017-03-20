const debug = require('debug')('then-while')
const Promise = require('any-promise')
const isPromise = require('is-promise')

function asPromise (value) {
  return isPromise(value) ? value : Promise.resolve(value)
}

function test (predicateFn) {
  return value => {
    return asPromise(predicateFn(value)).then(shouldContinue => ({
      shouldContinue,
      value
    }))
  }
}

function repeatOrFulfill (performStep) {
  return ({ shouldContinue, value }) => {
    debug(
      `The step function generated ${value} which was tested as ${shouldContinue}.`
    )
    return shouldContinue ? performStep() : value
  }
}

function createThenWhile (predicateFn, stepFn) {
  function thenWhile (...args) {
    return asPromise(stepFn(...args))
      .then(test(predicateFn))
      .then(repeatOrFulfill(thenWhile.bind(null, ...args)))
  }

  return thenWhile
}

module.exports = createThenWhile
