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
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.post("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"), function (err, data) {
        if (err) {
            throw err
        }
    })

    fs.writeFile("database.json", function (err) {
        // res.send("New Note Added")
        
    })
    res.end()
})

app.delete("/api/notes", function (req, res) {

})
//listeners 
app.listen(PORT, () => {
    console.log("Listening to port:" + PORT);
    console.log(db);
}); 