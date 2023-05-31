const { Schema, model } = require("mongoose");


const productSchema = new Schema({

    name : {
        type: String,
        required: true
    },

    price : {
        type: Number,
        required: true
    },

    description : {
        type: String,
        required: true
    },

    image : {
        type: String,
        required: true
    },

    createdBy : {
         type: Schema.Types.ObjectId,
        ref: "User"
    }
 })

 const Product = model("Product", productSchema);

 module.exports = Product;