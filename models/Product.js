const mongoose = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: true,
      },
    maxprice: {
        type: Number,
        required: true,
      },
    minprice: {
        type: Number,
        required: true,
      },
    description: {
        type: String,
        required:true
      },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
    img: {
        type: String,
        required: true,
      },
},{timestamps:true});

const Product = model("Product", productSchema);

export default Product;
