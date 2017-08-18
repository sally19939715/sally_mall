/**
 * Created by 15010 on 2017/8/10.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[{
    "productId":String,
    "productName":String,
    "salePrice":String,
    "productImage":String,
    "checked":String,
    "productNum":Number
  }],
  "addressList":[{
    "addressId":String,
    "userName":String,
    "streetName":String,
    "postCode":Number,
    "tel":Number,
    "isDefault":Boolean
  }]

});

module.exports = mongoose.model('User',userSchema,'users');
