module.exports.fetch = function(id, ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(id)
    }, ms);
  })
}