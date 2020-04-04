'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes (notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const uID = uuidv4()
    const now = moment().valueOf()
    notes.push({
        id: uID,
        title: '',
        body: '',
        createdAt: now,
        updatedAt: now
    })
    saveNotes(notes)
    location.assign(`/note.html#${uID}`)
    
})

document.querySelector('#search_text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

// const now = moment()
// now.subtract(1, 'week').subtract(20, 'days')
// console.log(now.format('MMMM Do, YYYY'))
// console.log(now.fromNow())

// const nowTimestamp = now.valueOf()

// console.log(moment(nowTimestamp).toString())

// const birthday = moment()
// birthday.date(23)
// birthday.month(1)
// birthday.year(1993)
// console.log(birthday.format('MMM D, YYYY'))