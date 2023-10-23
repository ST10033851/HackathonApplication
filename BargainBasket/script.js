const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/Pages'));

mongoose.connect("mongodb+srv://bargainbasket:bargainbasket123@bargainbasketcluster.gq7cemq.mongodb.net/BargainBasketDB")

const usersSchema = {
    email: String,
    username: String,
    password: String
}

const User = mongoose.model("User", usersSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Pages/LoginPage.html");
})

app.post("/", function(req, res){
    let newUser = new User ({
        email:  req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();
    res.redirect("/LandingPage.html");
})

app.listen(3000, function(){
    console.log("server is running on 3000");
})