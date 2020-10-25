// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");

const PORT = process.env.PORT || 4001;


// Get files in the public folder 
app.use(express.static('public'));

// Set up express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
// GET the notes in the JSON file
app.get("/api/notes", function (req, res) {

    // Using the file system statement, Read the JSON File
    fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
        if (err) throw err;
        // Parse the data into an object
        const notes = JSON.parse(data)
        // Send the JSON with the notes
        res.send(notes)
        console.log(notes);
    });


})

// POST the new note into the 'db.json' file
app.post("/api/notes", function (req, res) {

    // Read the current 'db.json' file
    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
        if (err) throw err;

        // Define the variable that will parse the new note into an object
        const newNote = JSON.parse(data)

        // Push the new note into the Key-Value pairs of data on the JSON file
        newNote.push(req.body)

        // Define the variable that will Stringify the Note which called from the JSON File
        const finalNote = JSON.stringify(newNote);

        // Write the object to the JSON file
        fs.writeFile(path.join(__dirname, "./db/db.json"), finalNote, function (err, data) {
            if (err) {
                throw err;
            }

        })
        // Send the JSON response which contains all key-value pairs
        res.json(req.body)
    })
})


app.delete("/api/notes", function (req, res) {

    res.end()
})

// Listener
app.listen(PORT, () => {
    console.log("app.listen");
    console.log("==================================")
    console.log("Listening to port: " + PORT);
    console.log("Notes Database:");
    console.log(db);
    console.log("==================================")
}); 