module.exports =  trikiParser


function trikiParser(chunk,effects,position,ok,nok){
    source = chunk.split('\n')
    let result = source.filter((element) => element !== '').map((element,index) => {
        var part = element.trim().split(':')
        var partResult = {
            type: 'trikiPart'
        }   
        let column = 0
        if(part.length === 2){
            partResult.label = part.shift()
            column = 3
        }
        if(part.length > 0){
            partResult.children = part.shift()
                .replace('[','')
                .replace(']','')
                .split(' ')
                .map((noteGroup) => {
                    let output = {
                        children: []
                    }

                    let groupBass = false;
                    let groupRepetitions = false;
                    let groupNotes = [];

                    const repetitionsRegex = /\*\d/
                    if(repetitionsRegex.test(noteGroup)){
                        groupRepetitions = {
                            type: 'trikiRepetitions',
                            repetitions: repetitionsRegex.exec(noteGroup)[0].replace('*','')
                        }
                        output.repetitions = groupRepetitions.repetitions
                        noteGroup = noteGroup.replace(repetitionsRegex, '')
                    }

                    const bass = noteGroup.split('/')
                    if(bass.length == 2)  {
                        output.bass = bass[1]
                        groupBass = {
                            type: 'trikiBass',
                            bass: bass[1]
                        }
                        noteGroup = bass[0]
                    }

                    noteGroup.split('-').map((note) => {
                        
                        let outputNote = {

                        }
                        const finger = note.split('.')
                        if(finger.length == 2) {
                            outputNote.finger = finger[1]
                            note = finger[0]
                            
                        }
                        outputNote.direction = 'in'
                        if(note.charAt(0) === '+'){
                            outputNote.direction = 'out'
                            note = note.replace('+','')
                        }
                        outputNote.number = note
                        outputNote.type = 'trikiNote'
                        groupNotes.push(outputNote)
                        
                    })
                    if(groupRepetitions){
                        output.children.push(groupRepetitions)
                    }
                    if(groupNotes){
                        output.children.push({
                            type: 'trikiNotes',
                            children: [...groupNotes]
                        })
                    }
                    if(groupBass){
                        output.children.push(groupBass)
                    }
                    
                    return {type:'trikiNoteGroup',...output}
                })
            partResult.line = position.line + index
            partResult.column = column
            
        }
        if(partResult.label){
            partResult.children = [{type:'trikiPartName',value:partResult.label},...partResult.children]
        }
        return partResult
        
        //effects.exit('trikiPart',partResult)
    })
    return result;
    //console.log(source);
    //console.log(dedent(chunk.trim()),'trikiChunk')
}
/**
 * bass with split
 * 
 * \*\d repeticion con asterisco.
 * [\+]\d{1,2} numeros en ireki
 * [\.]\d numeros de dedos
 * 
 */
