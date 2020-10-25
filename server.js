// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const uuid = require("uuid");

const PORT = process.env.PORT || 4001;


// Get files in the public folder 
app.use(express.static('public'));

// Set up express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "", "/db/db.json"), function (err, data){
        if (err){
            throw err
        }
    })
    // res.sendFile(path.join(__dirname, "/db/db.json"))
    console.log(req.body);
    res.send(req.body)
    res.end()
})

app.post("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"))
    let newNote = req.body;
    res.send(newNote)
    console.log(newNote);
    const updatedNewNote = JSON.stringify(newNote)
    fs.writeFile("./db/db.json", updatedNewNote, function (err, data){
        if (err){
            throw err 
        } 
    })
    // res.json(newNote)
    res.end()
})


app.delete("/api/notes", function (req, res) {

    res.end()
})
//listeners 
app.listen(PORT, () => {
    console.log("Listening to port:" + PORT);
    console.log(db);
}); 