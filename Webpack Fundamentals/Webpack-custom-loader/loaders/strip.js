var stripComments = require('strip-json-comments');

module.exports = function(source) {
  this.cacheable(); //rekne webpacku ze loader je cashable - same input produce same output

  console.log('source', source);
  console.log('strippedSource', stripComments(source));

  return stripComments(source);
}