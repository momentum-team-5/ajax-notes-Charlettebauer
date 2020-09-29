const url = 'http://localhost:3000/notes'


document.addEventListener('submit', function (event){
    event.preventDefault()
    const notesInput = document.querySelector('#notes-input').value
    console.log(notesInput)

fetch(url, {
  method: 'POST', 
  headers: {"Content-Type": "application/json"}, 
  body: JSON.stringify({
      notesItem: notesInput,
      created_at: moment().format()
     })
}).then(res => res.json())
})

fetch(url)
.then(res => res.json())
.then(notesdata => (
    const notesList = document.querySelector('.notes-list')
    const listEl = notesList.appendChild(document.createElement('ul'))
    for (const item of notesdata) {
        console.log(item)
        const notesItemEl = document.createElement('li)')
        notesItemEl.innerText = item.notesItem
        listEl.appendChild(notesItemEl)
    }
})








