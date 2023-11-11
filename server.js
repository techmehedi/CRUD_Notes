// Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// import dependencies

const express = require("express");
const cors = require("cors");
const connectToDb = require('./config/conntectToDb');
const notesController = require("./controllers/notesController");


// create an express app

const app = express();

// Configure express app

app.use(express.json());
app.use(cors());

// connect to Database;

connectToDb();

//Router


app.get("/notes", notesController.fetchNotes)

app.get('/notes/:id', notesController.fetchNote)

app.post('/notes', notesController.createNote)

app.put('/notes/:id', notesController.updateNote)

app.delete('/notes/:id', notesController.deleteNote)

// Start our server

app.listen(process.env.PORT);