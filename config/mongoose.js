//importing mongoose library
const mongoose = require("mongoose");

//establishng connection to localhost database
mongoose.connect("mongodb://localhost/contact_list_db");

//storing connection info
const db = mongoose.connection;

//on encountering error in establishing connection
db.on('error', console.error.bind("Error in connecting to db"));

//function to run when the connection is open/established
db.once('open', function(){
    console.log("Connection established with database successfully");
})