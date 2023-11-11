import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  // States
  const [notes, SetNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: '',
  })
  // Useffect
  useEffect(()=> {
    fetchNotes();
  }, [])

  // Function

  const fetchNotes = async () => {
    //Fetching the notes
    const res = await axios.get("http://localhost:3002/notes");
    // Set the state
    SetNotes(res.data.notes)
  }

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }

  const createNote = async (e) => {
    e.preventDefault();
    // Create the note
    const res = await axios.post("http://localhost:3002/notes", createForm)
    //Update the stae
    SetNotes([...notes, res.data.note])
    console.log(res)

    // Clear form state
    setCreateForm({title: '', body: ''})
  }

  const deleteNote = () => {
    
  }

  return (
    <div className="App">
      <div>

      <h2>Notes:</h2>
      {notes && notes.map(note => {
        return <div key={note._id}> 
          <h3>{note.title}</h3>
          <button>Delete note</button>
        </div>
      })}
      </div>
      <div>
        <h2>Create Notes</h2>
        <form onSubmit={createNote}>
          <input 
          onChange={updateCreateFormField}
          value={createForm.title} 
          name="title"
          />
          <textarea 
          onChange={updateCreateFormField}
          value={createForm.body} 
          name="body"
          />
          <button type="submit">Create note</button>
        </form>
      </div>
    </div>
  );
}

export default App;
