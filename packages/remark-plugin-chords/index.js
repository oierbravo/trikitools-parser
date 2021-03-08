var visit = require('unist-util-visit');
const toString = require("mdast-util-to-string");

function remarkPluginChords(tree) {

    return transformer;
    
    function transformer(tree) {
      visit(tree, 'paragraph', visitor);
  
      function visitor(node) {
        if(toString(node).search('chords: ') != -1){
            let value = toString(node).replace('chords: ','');
            let children = [];
            value.split(' ').map(function(el){
                    let child = {
                        type: 'chord',
                        data: {
                            hProperties : {
                                className:'chord'
                            },
                            hName:'div'
                        },
                        children: [{type:'text',value:el}]
                    }
                    children.push(child)  
                });
                
                node.type = 'chords';
                node.children =children,
                node.data =  {
                    hName: 'div',
                    hProperties : {
                        className:'chords'
                    },
                  } 
            };
            
        }
      }
    }

    module.exports = remarkPluginChords;