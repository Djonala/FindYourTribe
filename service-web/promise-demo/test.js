const { fetch } = require('./promise')

console.log('début de programme');

fetch('1', 3000)
.then(function(message) {
  console.log(message)
  return fetch('2', 1500)
})
.then(function(message) {
  console.log(message);
})
.then(function() {
  return 'bidon'
})
.then(function(value) {
  console.log(value)
})
.then(function() {
  console.log('then 3')
})

console.log('fin de programme');

