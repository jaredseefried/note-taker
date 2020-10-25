// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
// const uuid = require("uuid");
const PORT = process.env.PORT || 4000;

// Get files in the public folder 
app.use(express.static('public'));

// Set up express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/api/notes", function(req, res) {
    
    fs.readFile(path.join)(__dirname, "", "./db/db.json"), function(err, data){
        if (err){
            throw err;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    }

    res.end();
    
});

app.post("/api/notes.html", function (req, res){

})


//listeners 
app.listen(PORT, () => {
    console.log("Listening to port:" + PORT);
    console.log(db);
}); 