const express = require("express");
const port = 9000;
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//midleware to take data from form
app.use(express.urlencoded());
//middleware to access stylesheets, images and scripts
app.use(express.static("assets"));

//creating array of contacts
var contactList = [{"name" : "Shivani",
                    "phoneNo" : "1234567890"},
                    {"name" : "Kabir",
                    "phoneNo" : "2234567890"},
                    {"name" : "Tweety",
                    "phoneNo" : "3334567890"}
                  ];

//response for home page
app.get("/home", function(req, res){

    res.send(`<h1 style="text-align:center">Your own telphone directory</h1>`);
});  

//rendering response for contact page
app.get("/contact", function(req, res){

    return res.render("contact", {title: "Contact List",
                                  contact_list: contactList});
});

//adding contact to your contact-list from contact page form
app.post("/new_contact", function(req, res){

    contactList.push(
        {"name" : req.body.name,
         "phoneNo" : req.body.phoneNo});
    
    return res.redirect("back");    //back will take you to the previous page
});

//deleting contact form the list 
app.get("/delete_contact", function(req, res){
    console.log(req.query);
    let phone = req.query.phone;
    
    let contactIndex = contactList.findIndex(contact => contact.name == phone);

    if(contactIndex != -1)
        contactList.splice(contactIndex,1);

    return res.redirect("back");
});

//starting the Express port
app.listen(port, function(err){
    //showing error if error occurs
    if(err){
        console.log("Error running express server", err);
    }

    console.log("Starting Express server at port : ", port);
})