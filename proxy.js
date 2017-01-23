var http = require('http');
var net = require('net');
var url = require('url');
var fs = require('fs');
var mime = require("mime");

var config = require('./config.js');
function routor(req, res){
    var i, ii, item, reg;
    var items = config.replace;
    for(i = 0, ii = items.length; i < ii; ++i){
        item = items[i];
        reg = item.reg
        if(reg.test(req.url)){
            if(item.type == "file"){
                console.log("match url ==> " + req.url)
                console.log("replace file path ==> " + item.filePath)
                replace(req, res, item);
                return;
            }else if(item.type == "url"){
                console.log("match url ==> " + req.url)
                console.log("replace url ==> " + item.url)
                req.url = item.url;
            }else{
                console.warn("type is not supported");
            }
        }
    }
    request(req, res);
}

function replace(req, res, obj){
    fs.readFile(obj.filePath, function(err, data){
        if(err){
            console.error(err);
        }else{
            var time = new Date();
            var contentType;
            if(obj.contentType && obj.contentType != "auto"){
                contentType = obj.contentType;
            }else{
                contentType = mime.lookup(obj.filePath);
            }
            var headers = {
                server: 'tc-proxy',
                date: time,
                'content-type': contentType,
                'content-length': data.length,
                'last-modified': time,
                connection: 'close',
                'cache-control': 'no-cache',
                'accept-ranges': 'bytes' 
            }
            res.writeHead(200, headers);
            res.end(data, 'binary');
        }
    });
}

function request(cReq, cRes) {
    var u = url.parse(cReq.url);
    var options = {
            hostname : u.hostname, 
            port     : u.port || 80,
            path     : u.path,       
            method     : cReq.method,
            headers     : cReq.headers
    };
    var pReq = http.request(options, function(pRes) {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', function(e) {
        cRes.end();
    });
    cReq.pipe(pReq);
}

http.createServer().on('request', routor).listen(8090, '0.0.0.0');
