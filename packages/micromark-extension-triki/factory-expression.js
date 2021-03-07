'use strict'

module.exports = factoryExpression

var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var factoryWhitespace = require('micromark/dist/tokenize/factory-whitespace')
var VMessage = require('vfile-message')
//var eventsToAcorn = require('./util-events-to-acorn')

var trikiParser = require('./trikiCustomParser')

function factoryExpression(
  effects,
  ok,
  nok
) {
  var self = this
  var eventStart = this.events.length + 3 // Add main and marker token
  var balance = 1
  var startPosition
  var lastCrash
  var addResult = true

  const expressionType = 'trikiFlowExpression'
  const expressionMarkerType = 'trikiFlowExpressionMarker'
  const expressionChunkType = 'trikiFlowExpressionChunk'
  const expressionPartType = 'trikiPart'

  return start

  function start(code) {
    // Always a `{`
    effects.enter(expressionType)
    effects.enter(expressionMarkerType)
    effects.consume(code)
    effects.exit(expressionMarkerType)
    startPosition = self.now()
    return atBreak
  }

  function atBreak(code) {
    if (code === null) {
      throw (
        lastCrash ||
        new VMessage(
          'Unexpected end of file in expression, expected a corresponding closing brace for `{`',
          self.now(),
          'micromark-extension-triki:unexpected-eof'
        )
      )
    }

    if (code === 125) {
      return atClosingBrace(code)
    }

    if (markdownLineEnding(code)) {
      return factoryWhitespace(effects, atBreak)(code)
    }

    effects.enter(expressionChunkType)
    return inside(code)
  }

  function inside(code) {
    if (code === null 
      || code === 125 
      || markdownLineEnding(code)
      ) {
        
      effects.exit(expressionChunkType)
      return atBreak(code)
    }

    effects.consume(code)
    return inside
  }
  function atClosingBrace(code) {
    var result
    var token


    balance--

    // Agnostic mode: count balanced braces.


    // Gnostic mode: parse w/ acorn.
    var before = ''
    var after = ''
    var index = -1
    var chunks = []
    var lines = {}
    var mdStartOffset
    var source
    var token
    var point
    var isEmptyExpression
    var value

    let events = self.events.slice(eventStart);
    while (++index < events.length) {
        token = events[index][1]
    
        if (events[index][0] === 'exit') {
          chunks.push(events[index][2].sliceSerialize(token))

          if (mdStartOffset === undefined) {
            mdStartOffset = events[index][1].start.offset
          }
    
          if (
            !(token.start.line in lines) ||
            lines[token.start.line].offset > token.start.offset
          ) {
            lines[token.start.line] = token.start
          }
        }
      }
    
    source = chunks.join('')
    value = before + source + after
    result = trikiParser(value,effects,startPosition, ok, nok)

    effects.enter(expressionMarkerType)
    effects.consume(code)
    effects.exit(expressionMarkerType)
    token = effects.exit(expressionType)
    token.children = result;
    //if (addResult) token.children = result
    return ok
  }

  
}


/*
function atClosingBrace(code) {
    var result
    var token


    balance--

    // Agnostic mode: count balanced braces.


    // Gnostic mode: parse w/ acorn.
    var before = ''
    var after = ''
    var index = -1
    var chunks = []
    var lines = {}
    var mdStartOffset
    var source
    var token
    var point
    var isEmptyExpression
    var value

    let events = self.events.slice(eventStart);
    while (++index < events.length) {
        token = events[index][1]
    
        if (events[index][0] === 'exit') {
          chunks.push(events[index][2].sliceSerialize(token))

          if (mdStartOffset === undefined) {
            mdStartOffset = events[index][1].start.offset
          }
    
          if (
            !(token.start.line in lines) ||
            lines[token.start.line].offset > token.start.offset
          ) {
            lines[token.start.line] = token.start
          }
        }
      }
    
      source = chunks.join('')
      value = before + source + after
      result = trikiParser(value,effects,startPosition, ok, nok)

 /*   result = eventsToAcorn(acorn, acornOptions, self.events.slice(eventStart), {
      start: startPosition,
      expression: true,
      allowEmpty: !spread,
      prefix: spread ? '({' : '',
      suffix: spread ? '})' : ''
    })
    estree = result.estree
*/
    // Get the spread value.
  /*  if (spread) {
      if (
        estree &&
        // The next checks should always be the case, as we wrap in `d={}`
        estree.type === 'Program' &&
        estree.body[0] &&
        estree.body[0].type === 'ExpressionStatement' &&
        estree.body[0].expression.type === 'ObjectExpression'
      ) {
        if (!estree.body[0].expression.properties[0]) {
          throw new VMessage(
            'Unexpected empty spread expression: expected `...`',
            {
              line: estree.loc.start.line,
              column: estree.loc.start.column + 1,
              offset: estree.start
            },
            'micromark-extension-mdx-expression:non-spread'
          )
        } else if (estree.body[0].expression.properties[1]) {
          throw new VMessage(
            'Unexpected extra content in spread: only a single spread is supported',
            {
              line: estree.body[0].expression.properties[1].loc.start.line,
              column:
                estree.body[0].expression.properties[1].loc.start.column + 1,
              offset: estree.body[0].expression.properties[1].start
            },
            'micromark-extension-mdx-expression:spread-extra'
          )
        } else if (
          estree.body[0].expression.properties[0].type !== 'SpreadElement'
        ) {
          throw new VMessage(
            'Unexpected `' +
              estree.body[0].expression.properties[0].type +
              '` in code: only spread elements are supported',
            {
              line: estree.body[0].expression.properties[0].loc.start.line,
              column:
                estree.body[0].expression.properties[0].loc.start.column + 1,
              offset: estree.body[0].expression.properties[0].start
            },
            'micromark-extension-mdx-expression:non-spread'
          )
        }
      }
    }
*/
  /*  if (result.error) {
      lastCrash = new VMessage(
        'Could not parse expression with acorn: ' + result.error.message,
        {
          line: result.error.loc.line,
          column: result.error.loc.column + 1,
          offset: result.error.pos
        },
        'micromark-extension-mdx-expression:acorn'
      )

      if (code !== null && result.swallow) {
        effects.enter(expressionChunkType)
        effects.consume(code)
        return inside
      }

      throw lastCrash
    }

    effects.enter(expressionMarkerType)
    effects.consume(code)
    effects.exit(expressionMarkerType)
    token = effects.exit(expressionType)
    token.value = value;
    if (addResult) token.children = result
    return ok
  }
*/