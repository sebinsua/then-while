# `then-while`
> Call an (a)sync function until an (a)sync predicate returns false.

By default the behaviour is that of a [do while loop](https://en.wikipedia.org/wiki/Do_while_loop).

## Example

```js
const createThenWhile = require('then-while')

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
