var http = require('http'),                                                
    Stream = require('stream').Transform,                                  
    fs = require('fs');                                                    

var url = 'https://github.com/prannoy47/demo-jenkins-build/blob/master/HPE-Container-Platform_logo_1.png';                    

http.request(url, function(response) {                                        
  var data = new Stream();                                                    

  response.on('data', function(chunk) {                                       
    data.push(chunk);                                                         
  });                                                                         

  response.on('end', function() {                                             
    fs.writeFileSync('image.png', data.read());                               
  });                                                                         
}).listen(8000);
console.log("Server listening on port 8000 :  http://127.0.0.1:8000/");
