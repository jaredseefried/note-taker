// Dependencies 
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const uuid = require("uuid");
const PORT = process.env.PORT || 4000;

//Get index.html and notes.html 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes


//listeners 
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});