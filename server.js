// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const uuid = require("uuid")

const PORT = process.env.PORT || 4001;

// Get files in the public folder 
app.use(express.static('public'));

// Set up express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

// GET the notes from the db.json file. 
app.get("/api/notes", function (req, res) {

    // Using the file system, read the db.json file, parse the data in an object and send it back in a response.
    fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data) 
        res.send(notes)
        console.log(notes);
    });
})

// POST - Write the new note to the db.json file. 
app.post("/api/notes", function (req, res) {

    // Using the file system, parse the data into an object, get the body of the array, give it an ID and push the note into the JSON file as an object.
    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
        if (err) throw err;
        const noteObj = JSON.parse(data);
        const note = req.body;
        notes.id = uuid.v1();
        noteObj.push(note);

        // Turn the note object into a string and write it to the JSON file. 
        const noteStr = JSON.stringify(noteObj);
        fs.writeFile(path.join(__dirname, "./db/db.json"), noteStr, function (err) {
            if (err) throw err;
        })
        res.json(req.body)
    })
})

// Delete the specified Note
app.delete("/api/notes/:id", function (req, res) {

    // Get the note ID, read the JSON file, parse the string into an object, filter through the data and if the ID of what is being deleted does not match > write those to the JSON file and remove the one that did match. 
    const noteID = req.params.id;
    fs.readFile(path.join(__dirname, "", "./db/db.json"), function (err, data) {
        if (err) throw err;
        const notes = JSON.parse(data);
        const deleteNote = notes.filter((noteObj) => noteObj.id !== noteID)
        fs.writeFile("./db/db.json", JSON.stringify(deleteNote), function (err, data) {
            if (err) throw err;
        })
        res.json(deleteNote)
    })
})

// Listener
app.listen(PORT, () => {
    console.log("==================================")
    console.log("Listening to port: " + PORT);
    console.log("db.json file");
    console.log(db);
    console.log("==================================")
}); 