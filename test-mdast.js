var fs = require('fs')
var fromMarkdown = require('mdast-util-from-markdown')

var frontmatterSyntax = require('micromark-extension-frontmatter')
var frontmatter = require('mdast-util-frontmatter')

var trikiSyntax= require('./packages/micromark-extension-triki')
var triki = require('./packages/mdast-util-triki')

var directiveSyntax = require('micromark-extension-directive')
var directive = require('mdast-util-directive')

var doc = fs.readFileSync('../beti-eskama-kentzen.md')

var tree = fromMarkdown(doc, {
  extensions: [frontmatterSyntax(['yaml', 'toml']),trikiSyntax(),directiveSyntax()],
  mdastExtensions: [frontmatter.fromMarkdown(['yaml', 'toml']),triki.fromMarkdown(),directive.fromMarkdown]
})
console.log(triki.fromMarkdown())
console.log(triki.expressionFromMarkdown)
console.log(tree)

