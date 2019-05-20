var http=require('http');
function onRequest(request,response){
    response.writeHead(200,{'Content-Type':'text.plain'});
    response.write('hello amal');
    response.end();

}
http.createServer(onRequest).listen(8000);