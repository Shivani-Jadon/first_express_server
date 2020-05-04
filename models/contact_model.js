//importing library, single instance will be used everywhere in the entire folder
const mongoose = require("mongoose");

//creating schema for contact list db
const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    phoneNo : {
        type: String,
        required: true,
        max: 10,
        min: 10
    }
});

//modelling collection to store schema
const Contact = mongoose.model('Contact', contactSchema);

//exporting database collection
module.exports = Contact;