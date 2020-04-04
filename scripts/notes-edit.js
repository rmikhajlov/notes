'use strict'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const lastUpdated = document.querySelector('#note-updated')



const noteId = location.hash.substring(1,)
let notes = getSavedNotes()
let note = notes.find((note) => noteId === note.id)


if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
timeUpdate(lastUpdated, note)

titleElement.addEventListener('input', () =>{
    note.title = titleElement.value
    let now = moment().valueOf()
    note.updatedAt = now
    saveNotes(notes)
    timeUpdate(lastUpdated, note)
})

bodyElement.addEventListener('input', () => {
    note.body = bodyElement.value
    let now = moment().valueOf()
    note.updatedAt = now
    saveNotes(notes)
    timeUpdate(lastUpdated, note)
})

removeButton.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => noteId === note.id)
        
        if (!note) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        timeUpdate(lastUpdated, note)
    }
    
})