/**
 * Created by 15010 on 2017/8/3.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":String,//"productId":{type:String}
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "productNum":Number,
  "checked":String
});
module.exports = mongoose.model('Good',productSchema,'goods');
