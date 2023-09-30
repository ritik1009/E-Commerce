const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const {isloggedIn ,isAdmin} = require('../middleware')

router.get('/all_products',async(req,res)=>{
    const data = await Product.find();
    res.status(200).json({data})
})

router.get('/product_details/:id',async(req,res)=>{
    const {id} = req.params
    const data = await Product.findById(id);
    res.status(200).json({data})
})

module.exports = router