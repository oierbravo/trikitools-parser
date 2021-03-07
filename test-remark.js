var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('remark-parse')
var stringify = require('remark-stringify')
var triki = require('./remark-plugin-triki')
var trikiHast = require('./hast-util-triki')
var frontmatter = require('remark-frontmatter')

var html = require('remark-html');


unified()
  .use(parse)
  .use(stringify)
  .use(triki)
  .use(frontmatter, ['yaml','toml'])
  .use(logger)
  .use(html,trikiHast.toHast)
  .use(logger)
  .process(vfile.readSync('beti-eskama-kentzen.md'), function (err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })

function logger() {
  return console.dir
}
a = '';