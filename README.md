# `then-while`
> Call an (a)sync function until an (a)sync predicate returns false.

## Example

```js
const thenWhile = require('then-while')

const predicate = value => Promise.resolve(value < 0.5)
const performStep = message => Promise.resolve(`${(Math.random())}`)

const generateNumber = createThenWhile(predicate, performStep)

generateNumber('some arguments')
  .then(randomNumber => console.log('random number:', randomNumber))
```

## Install

```sh
yarn add then-while
```
