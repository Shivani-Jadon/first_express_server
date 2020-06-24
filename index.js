const express = require("express");
const port = 9000;

//establishing connection with the database
const db = require("./config/mongoose");
//exporting schema from the model
const Contact = require("./models/contact_model");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//midleware to take data from form
app.use(express.urlencoded());
//middleware to access stylesheets, images and scripts
app.use(express.static("assets"));

//creating array of contacts as variable
/*var contactList = [{"name" : "Shivani",
                    "phoneNo" : "1234567890"},
                    {"name" : "Kabir",
                    "phoneNo" : "2234567890"},
                    {"name" : "Tweety",
                    "phoneNo" : "3334567890"}
                  ]; */

//response for home page
app.get("/home", function(req, res){

    res.send(`<h1 style="text-align:center">Your own telphone directory</h1>`);
});  


//rendering response for contact page
app.get("/contact", function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in reading from the view ", err);
            return;
        }

        return res.render("contact", {title: "Contact List",
                                  contact_list: contacts});
    });

});


//adding contact to your contact-list from contact page form
app.post("/new_contact", function(req, res){
    //storing new contacts in the variable 
    // contactList.push(
    //     {"name" : req.body.name,
    //      "phoneNo" : req.body.phoneNo});
    
    //storing contacts in the db
    Contact.create({
        name : req.body.name,
        phoneNo : req.body.phoneNo
    }, function(err, newContact){

            if(err){
                console.log("error in updating in database ", err);
                return;
            }

            return res.redirect("back");    //back will take you to the previous page
    })
   
});


//deleting contact form the list 
app.get("/delete_contact", function(req, res){
    console.log("deleting " ,req.query);                     //printing contact to be deleted on console
    let id = req.query.id;
    
    //deleting data in the volatile memory
    /*let contactIndex = contactList.findIndex(contact => contact.name == phone);
    if(contactIndex != -1)
        contactList.splice(contactIndex,1); */

    //deleting data from the database
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting from database ",err);
            return;
        }

        return res.redirect("back");
    });
    
});


//starting the Express port
app.listen(port, function(err){
    //showing error if error occurs
    if(err){
        console.log("Error running express server", err);
        return;
    }

    console.log("Starting Express server at port : ", port);
})