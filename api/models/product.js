const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name:String,
    description: {type:String, default:""},
    images:{type:String, default:""},
    price:{type:Number,default:0},
    pr_Id:{type:String, default:""},
    pr_type:{type:String, default:""},
    status:{type:String, default:"active"},
});


module.exports = mongoose.model('Product',Product);

