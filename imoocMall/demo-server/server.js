/**
 * Created by 15010 on 2017/7/31.
 */
let url = require('url');
let http = require('http');
let util = require('util');
let fs = require('fs');
let server = http.createServer((req,res)=>{
  res.statusCode = 200;
  // res.setHeader("Content-Type","text/plain");
  // util.inspect(url.parse(req.url));
  var pathname = url.parse(req.url).pathname;
  console.log("path:"+pathname);
  // res.end(util.inspect(url.parse("http://localhost:3000/index?a=123")));
  fs.readFile(pathname.substring(1),(err,data)=>{
    if(err){
      res.writeHead(404,{
        "Content-Type":"text/html"
      })
    }else{
      res.writeHead(200,{
        "Content-Type":"text/html"
      });
      res.write(data.toString());
    }
    res.end();
  });

});
server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，请输入127.0.0.1:3000来访问");
});
