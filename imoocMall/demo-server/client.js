/**
 * Created by 15010 on 2017/8/1.
 */
let http = require("http");
let util = require("util");
http.get("http://www.imooc.com/u/card",res=>{
  let data = '';
  res.on("data",function(chunk){
    data+=chunk;
  });
  res.on("end",function(){
    let result = JSON.parse(data);
    console.log(`result:${util.inspect(result)}`);
  });
})
