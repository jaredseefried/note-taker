// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const uuid = require("uuid");
const PORT = process.env.PORT || 4000;

// Express middleware Statements
// Get files in the public folder 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

// app.get("/api/notes", function(req, res) {
//     // var dbnote = req.params.db
//     // console.log(dbnote);
//     res.end();
// });


//listeners 
app.listen(PORT, () => {
    console.log("Listening to port:" + PORT);
}); 