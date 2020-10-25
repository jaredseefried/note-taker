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

    // Using the file system, read the db.json file, parse the data and send it the browser
    fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data)
        res.send(notes)
        console.log(notes);
    });


})

// POST - Write the new note to the db.json file. 
app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
        if (err) throw err;
        const noteObj = JSON.parse(data);
        const notes = req.body;
        notes.id = uuid.v1();
        noteObj.push(notes);
    
        const noteStr = JSON.stringify(noteObj);
        fs.writeFile(path.join(__dirname, "./db/db.json"), noteStr, function (err) {
            if (err) throw err;
        })
        res.json(req.body)
    })
})

// Delete the specified Note
app.delete("/api/notes", function (req, res) {
 

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