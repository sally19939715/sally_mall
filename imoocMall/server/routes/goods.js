/**
 * Created by 15010 on 2017/8/3.
 */
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

mongoose.connection.on("connected",function(){
  console.log("MongoDB connected success");
});

mongoose.connection.on("error",function(){
  console.log("MongoDB connected fail");
});

mongoose.connection.on("disconnected",function(){
  console.log("MongoDB disconnected");
});

router.get("/list",function(req,res,next){

  /*获取浏览器地址栏的参数*/
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = parseInt(req.param('sort'));
  let priceLevel = req.param('priceLevel');
  /*\获取浏览器地址栏的参数*/

  let skip = (page-1)*pageSize;
  let params = {};
  let priceGt = '',priceLte = '';
  if(priceLevel != 'All'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte = 100;break;
      case '1':priceGt = 100;priceLte = 500;break;
      case '2':priceGt = 500;priceLte = 1000;break;
      case '3':priceGt = 1000;priceLte = 5000;break
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});

  goodsModel.exec(function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});

//加入到购物车
router.post('/addCart',function(req,res,next){
  var userId = '100000077',productId = req.body.productId;
  var User = require('./../models/user');

  User.findOne({
    userId:userId
  },function(err,userDoc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      // console.log('userDoc:'+userDoc);
      if(userDoc){
        let goodsItem = '';
        userDoc.cartList.forEach(item=>{
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++;
          }
        });
          if(goodsItem){//为true,说明该商品已存在于购物车列表中
            userDoc.save(function(err2,doc2){
              if(err2){
                res.json({
                  status:'1',
                  msg:err2.message
                });
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'success'
                });
              }
            });
          }else{//goodsItem为false的情况下,直接将该商品保存于数据库的商品列表中就行

            Goods.findOne({productId:productId},function(err1,doc){
              if(err1){
                res.json({
                  status:'1',
                  msg:err1.message
                })
              }else{

                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function(err2,doc2){
                    if(err2){
                      res.json({
                        status:'1',
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'success'
                      })
                    }
                  })
                }
              }
            })
          }


      }
    }
  })



});

module.exports = router;
