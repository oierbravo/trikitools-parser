//module.exports = toHast
var all = require('mdast-util-to-hast/lib/all')
var wrap = require('mdast-util-to-hast/lib/wrap')

var u = require('unist-builder')

//https://unicode-table.com/es/sets/symbols-for-nickname/
const fingerMap = {
  1:'',
  2:'●', //css:\25CF  U+25CF
  3:'○', //css:\25CB  U+25CB
  4:'×'  //css:\00D7  U+00D7
}


exports.handlers = {
    trikiFlowExpression,
    trikiPart,
    trikiPartName,
    trikiNoteGroup,
    trikiNotes,
    trikiNote,
    trikiBass,
    trikiRepetitions
  }

  function trikiFlowExpression(h,node) {
    let props = {
        className:'triki'
    }
    return h(node,'section',props,all(h,node))
  }
  function trikiPart(h,node) {
    let props = {
        className:'triki-part'
    }
    if(!node.label){
      props.className += ' triki-part-without-name'
    }

    return h(node,'div',props,all(h,node))
  }
  function trikiPartName(h,node) {
    let props = {
        className:'triki-part--name'
    }

    return h(node,'span',props,[u('text',node.value + ':')])
  }
  function trikiNoteGroup(h,node) {
    let props = {
      className:'triki-group'
    }
    if(!node.repetitions){
      props.className += ' triki-group-without-repetitions'
    }
    if(!node.bass){
      props.className += ' triki-group-without-bass'
    }
    return h(node,'div',props,all(h,node))
  }
  function trikiNotes(h,node) {
    let props = {
      className:'triki-notes'
    }
    
    return h(node,'div',props,all(h,node))
  }
  function trikiNote(h,node) {
    let props = {
        className:'triki-note triki-note--' + node.direction,
    }
    let children = [h(node,'span',{className:'triki-note-number'},[u('text', node.number)])]
    if(node.finger){
      //props.className += ' triki-finger-' + node.finger
      children.push(h(node,'span',{className:'triki-note-finger' },[u('text', fingerMap[node.finger])]))
    }
    node.children = children
    return h(node,'div',props, wrap(children, true))
  }
  function trikiBass(h,node) {
    let props = {
        className:'triki-bass'
    }
    return h(node,'span',props, [u('text', node.bass)])
  }
  function trikiRepetitions(h,node) {
    let props = {
        className:'triki-repetitions'
    }
    return h(node,'span',props, [u('text', node.repetitions)])
  }
  