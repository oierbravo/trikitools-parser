'use strict'

module.exports = trikiExpression

var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var factorySpace = require('micromark/dist/tokenize/factory-space')
var factoryExpression = require('./factory-expression')

function trikiExpression(options) {
  var settings = options || {}

  return {
    flow: {123: {tokenize: tokenizeFlowExpression, concrete: true}},
  }

  function tokenizeFlowExpression(effects, ok, nok) {
    var self = this

    return start

    function start(code) {
      /* istanbul ignore if - handled by mm */
      if (code !== 123 /* `{` */) throw new Error('Expected `{`')

      return factoryExpression.call(
        self,
        effects,
        //factorySpace(effects, after, 'whitespace'),
        ok,
        nok,
      )(code)
    }

    function after(code) {
      return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
    }
  }
}