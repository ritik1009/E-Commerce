const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const {isloggedIn ,isAdmin} = require('../middleware')


router.post('/add_product',isloggedIn,isAdmin,async(req,res)=>{
    const {name, description, images, price, pr_Id, pr_type,status } = req.body
    const product = new Product({name,description,images,price,pr_Id,pr_type,status});
    await product.save()
    return res.status(200).json({message:"The Product has been added"})
})

router.put('/modify_product/:id',isloggedIn,isAdmin,async(req,res)=>{
    const {id} = req.params;
    const product_update = req.body.product;
    const update = await Product.findByIdAndUpdate(id,product_update,{new:true});
    return res.status(200).json({message:"The Product has been Updated"})
})

router.delete('/delete_product/:id',isloggedIn,isAdmin,async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({message:"The Product has been Deleted"})
})

module.exports = router

