/*exports.enter = {
    trikiFlowExpression: enterTrikiFlowExpression
  }
  exports.exit = {
    trikiFlowExpression: exitTrikiExpression,
    trikiFlowExpressionChunk: exitTrikiExpressionData,
  }
  */
module.exports = createFromMarkdown
function createFromMarkdown(options) {
  var enter = {}
  var exit = {}

  enter['trikiFlowExpression'] = enterTrikiFlowExpression
  exit['trikiFlowExpression'] = exitTrikiExpression

  enter['trikiPart'] = enterTrikiPart
  exit['trikiPart'] = exitTrikiPart

  exit['trikiFlowExpressionChunk'] = exitTrikiExpressionData

  return {enter: enter, exit: exit}
}
  var stripIndent = require('strip-indent')
  
  function enterTrikiFlowExpression(token) {
    this.enter({type: 'trikiFlowExpression',children: token.children}, token)
    this.buffer()
  }
  

  function exitTrikiExpression(token) {
    var value = this.resume()
    //var node = this.exit({type: 'trikiFlowExpression'},token)
    var node = this.exit(token)
    //node.children = token.childre || []
  
    if (token.value) {
      //node.value = {children: token.children}
      node.children = token.value
    }
    
  }
  function enterTrikiPart(token){
    this.enter({type: 'trikiPart', repetitions: 0, children: []}, token);
    this.buffer()
  }
  function exitTrikiPart(token){
    this.config.enter.data.call(this, token)
    this.config.exit.data.call(this, token)
    //this.exit({type: 'trikiPart'},token)
    //this.enter({type: 'trikiFlowExpression', value: ''}, token);
    //var value = this.resume()
    //var node = this.exit(token);
    //if (token.children) {
    //  node.children = {children: token.children}
    //}
    var a = '';
  }
  function exitTrikiExpressionData(token) {
    //this.config.enter.enterTrikiPart.call(this, token)
    //this.config.exit.enterTrikiPart.call(this, token)
    //this.exit({type: 'trikiFlowExpression'},token)
    //this.config.exit.data.call(this, token)
    this.config.enter.data.call(this, token)
    this.config.exit.data.call(this, token)
  }
  
  function dedent(value) {
    var firstLineEnding = /\r?\n|\r/.exec(value)
    var position = firstLineEnding
      ? firstLineEnding.index + firstLineEnding[0].length
      : -1
  
    if (position > -1) {
      return value.slice(0, position) + stripIndent(value.slice(position))
    }
  
    return value
  }
  