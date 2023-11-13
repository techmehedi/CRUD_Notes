import { useState, useEffect } from "react";
import axios from "axios";

function App() {
 const [notes, SetNotes] = useState(null);
 const [createForm, setCreateForm] = useState({
  title: '',
  body: '',
 })

 const [updateForm, setUpdateForm] = useState({
  _id: null,
  title: '',
  body: '',
 })

 useEffect(()=> {
  fetchNotes();
 }, [])

 useEffect(() => {
  // Do something when notes state changes
 }, [notes]);

 const fetchNotes = async () => {
  const res = await axios.get("http://localhost:3002/notes");
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
  const res = await axios.post("http://localhost:3002/notes", createForm)
  SetNotes([...notes, res.data.note])
  setCreateForm({title: '', body: ''})
 }

 const deleteNote = async (_id) => {
  await axios.delete(`http://localhost:3002/notes/${_id}`)
  const newNote = [...notes].filter(note => {
    return note._id !== _id;
  })
  SetNotes(newNote); 
 }

 const handleUpdateFieldChange = (e) => {
  const {value, name} = e.target
  setUpdateForm({
    ...updateForm,
    [name]: value,
  })
 }

 const toggleUpdate = (note) => {
  setUpdateForm({title: note.title, body: note.body, _id: note._id})
 }

 const updateNote = async (e) => {
  e.preventDefault();
  const {title, body} = updateForm;
  const res = await axios.put(`http://localhost:3002/notes/${updateForm._id}`, {title, body})
  const newNotes = [...notes];
  const noteIndex = notes.findIndex(note => {
    return note._id === res.data.note._id;
  })
  newNotes[noteIndex] = res.data.note;
  SetNotes(newNotes)
  setUpdateForm({
    _id: null,
    title: "",
    body: "",
  })
 }

 return (
  <div className="App">
    <div>
      <h2>Notes:</h2>
      {notes && notes.map(note => {
        return <div key={note._id}> 
          <h3>{note.title}</h3>
          <button onClick={() => deleteNote(note._id)}>Delete note</button>
          <button onClick={() => toggleUpdate(note)}>Update note</button>
        </div>
      })}
    </div>
    {!updateForm._id && (<div>
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
    </div>)}
    {updateForm._id && (
     <div>
      <h2>
        Update Note 
      </h2>
      <form onSubmit={updateNote}>
        <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title" />
        <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body" />
        <button type="submit">Update Note</button>
      </form>
     </div> )}
   </div>
 );
}


export default App;
