'use strict'

var syntax = require('../micromark-extension-triki')
//var fromMarkdown = require('../mdast-util-triki/expression-from-markdown')
//var toMarkdown = require('../mdast-util-triki/to-markdown')
var trikiUtils = require('../mdast-util-triki/')

//var toHast = require('../mdast-util-triki/to-hast')

//var toMarkdown = require('mdast-util-frontmatter/to-markdown')

module.exports = triki

function triki() {
  var self = this
  var data = this.data()
  add('micromarkExtensions', syntax())
  add('fromMarkdownExtensions', trikiUtils.fromMarkdown())
  add('toMarkdownExtensions', trikiUtils.toMarkdown)

  //add('toHastExtension',triki.toHast)
  //add('toHast',triki.toHast)


  //add('toMarkdownExtensions', toMarkdown(options))
  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }
}
