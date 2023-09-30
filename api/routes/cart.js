const express = require('express');
const routes = express.Router({mergeParams:true});
const User = require('../models/users')
const Product = require('../models/product')
const {isloggedIn} = require('../middleware')

routes.post('/add_to_cart/:id',isloggedIn,async(req,res)=>{
    const {id} = req.params;
    const user_id = req.user._id;
    const user_data = await User.findById(user_id)
    var updated_data = user_data.user_cart.push({product_id:id,quantity:1})
    console.log(updated_data)
    await user_data.save()
    res.status(200).json("Added to the Cart")
})

routes.delete('/add_to_cart/:product_id',isloggedIn,async(req,res)=>{
    const {product_id} = req.params;
    const user_id = req.user._id;
    const Updated_data = await User.findByIdAndUpdate(user_id,{$pull:{user_cart:{product_id:product_id}}});
    console.log("Updated data",Updated_data)
    res.status(200).json("The product is been removed from the cart")
})

routes.get('/',isloggedIn,async(req,res)=>{
    const user_id = req.user._id;
    const data = await User.findById(user_id)
    console.log("The Data",data.user_cart,user_id)
    res.status(200).json(data.user_cart)
})


module.exports=routes
