const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Pages', 'views'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/Pages'));

mongoose.connect("mongodb+srv://bargainbasket:bargainbasket123@bargainbasketcluster.gq7cemq.mongodb.net/BargainBasketDB")

/* const productsSchema = {
  _id: Number,
  Name: String,
  Category: String,
  Price: Number,
  ShopID: Number
} */

/* const Product = mongoose.model("Product", productsSchema); */

/* const productsToInsert = [
  
]; */

/* Product.insertMany(productsToInsert)
  .then((result) => {
    console.log("Products inserted successfully.");
  })
  .catch((err) => {
    console.error(err);
  }); */

  const usersSchema = {
    email: String,
    username: String,
    password: String
}

const productsSchema = {
  Name: String,
  Category: String,
  Price: Number,
  ShopID: Number,
  imageURL: String,
}

const Product = mongoose.model('Product', productsSchema);
const User = mongoose.model("User", usersSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Pages/LandingPage.html");
})

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username, password: password });

    if (user) {
      
      res.redirect("/HomePage.html");
    } else {
      res.redirect("/?error=authFailed");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login.html");
  }
});

app.post("/register", function(req, res){
    let newUser = new User ({
        email:  req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();
    res.redirect("/HomePage.html");
})

app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const productsPerPage = 9;

  const skip = (page - 1) * productsPerPage;
  const products = await Product.find({}).skip(skip).limit(productsPerPage);

  const totalProducts = await Product.countDocuments();
  const hasNextPage = skip + products.length < totalProducts;

  res.render('ProductsPage', {
      productsList: products,
      currentPage: page,
      hasNextPage: hasNextPage
  });
});

app.listen(3000, function(){
    console.log("server is running on 3000");
})

//Kaushils script for Home And Product Pages

/* document.querySelector('.product-grid').addEventListener('click', function (event) {
    if (event.target.classList.contains('decrease')) {
      // User clicked the decrease button
      const quantityElement = event.target.nextElementSibling;
      let currentQuantity = parseInt(quantityElement.textContent, 10);
      if (currentQuantity > 0) {
        quantityElement.textContent = currentQuantity - 1;
      }
    } else if (event.target.classList.contains('increase')) {
      // User clicked the increase button
      const quantityElement = event.target.previousElementSibling;
      let currentQuantity = parseInt(quantityElement.textContent, 10);
      quantityElement.textContent = currentQuantity + 1;
    }
  }); */

  