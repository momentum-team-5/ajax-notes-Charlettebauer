/*globals fetch, moment*/
const url = 'http://localhost:3000/notes'
const notesList = document.querySelector('#notes-list')

document.addEventListener('submit', function (event) {
  event.preventDefault()
  createNotes()
})

 notesList.addEventListener('click', function (e) {
   if (e.target.matches('.delete')) {
     console.log(e.target.parentElement.dataset.id)
     deleteNotes(e.target.parentElement.dataset.id)
   }
 })

function renderNotesList () {
  fetch(url)
    .then(res => res.json())
    .then(notesData => {
      for (const notes of notesData) {
        renderNotesItem(notes)
      }
    })
}


function renderNotesItem (notes) {
  const notesList = document.querySelector('#notes-list')
  const notesItemEl = document.createElement('li')
  notesItemEl.dataset.id = notes.id
  notesItemEl.id = 'item-${notes.id}'
  notesItemEl.innerText = notes.notesItem
  const deleteIcon = document.createElement('span')
  deleteIcon.classList.add('fas', 'fa-times', 'mar-l-xs', 'delete')
  notesItemEl.appendChild(deleteIcon)
  notesList.appendChild(notesItemEl)
}

function createNotes () {
  const notesInputField = document.querySelector('#notes-input')
  
const requestData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      notesItem: notesInputField.value,
      created_at: moment().format()
    })
  }
  
fetch(url, requestData)
    .then(res => res.json())
    .then(data => {
      notesInputField.value = ''
      renderNotesItem(data)
    })
}
function deleteNotes (notesId) {
  fetch(url + '/' + notesId, {
    method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      const itemToRemove = document.querySelector(`li[data-id='${notesId}']`)
      itemToRemove.remove()
    })
}
renderNotesList()