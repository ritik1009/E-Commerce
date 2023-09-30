// Requiring the packages
const express = require('express');
require('dotenv').config()
const app = express();
const authRoute = require('./routes/auth');
const modifyProduct = require('./routes/modifyProducts')
const products = require('./routes/product')
const cart = require('./routes/cart')
const passport = require('passport');
const { default: mongoose } = require('mongoose');
require('./passport-config')(passport);
// const morgan = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');


// Connecting the mongoose database server
mongoose.connect('mongodb://127.0.0.1:27017/E_Commerce',{useNewUrlParser:true})
.then(()=>{
    console.log("Connected to the Mongoose database")
}).catch((error)=>{
    console.log("There was an error while connecting to the mongodb",error)
});

//  middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan("common"));
app.use(cors())
app.use(passport.initialize());


// Routes
app.use("/api/auth",authRoute);
app.use("/api/product",passport.authenticate('jwt', { session: false }),modifyProduct);
app.use("/api/products",products);
app.use("/api/cart",passport.authenticate('jwt', { session: false }),cart);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log("InsideThe Function")
  res.send(`You have accessed a protected route! ${req.user}`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});