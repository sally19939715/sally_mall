/**
 * Created by 15010 on 2017/7/31.
 */
let url = require('url');
let http = require('http');
let util = require('util');
let server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain");
  // util.inspect(url.parse(req.url));
  console.log('url:'+req.url);
  console.log("parse:"+url.parse(req.url));
  console.log("inspect:"+util.inspect(url.parse(req.url)));
  res.end(util.inspect(url.parse("http://localhost:3000/index?a=123")));
});
server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，请输入127.0.0.1:3000来访问");
});
