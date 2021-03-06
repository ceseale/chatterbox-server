/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = {results : 
  [
    {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    }
  ] 
};


var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  //this console.log runs each time this requestHandler function is invoked
  //request object has some properties such as method url
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  // This particular code means the request was fulfilled
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/plain";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
      response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
 
  if (request.method === "GET" ) {
    if (request.url === "/classes/messages") {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));
    } else {
      response.writeHead(statusCode, headers);

      response.end("was a get but wasnt favicon")
    }
  } else if(request.method === "POST"){ 
     
    if(request.url === "/classes/messages"){
      var body = ''
      request.on('data', function(chunk){
        body += chunk
        console.log(chunk);
      })

      request.on('end', function(){ 
        console.log(body);
        var message = JSON.parse(body);
        message['createdAt'] = Date.now();
        messages.results.push(message); 
        console.log(message);
        statusCode = 200;
        response.writeHead(statusCode, headers);
        response.end();
      })
      // console.log(response); 
    }
 } else if(request.method === "OPTIONS") {
      response.end();
 }



    //response.end() with the messages array
    // var outData = {results : messages };
    // response.write(JSON.stringify(outData));

  // // else if request.method is POST
  // } else if (request.method === "POST") {
  //   //get the data from the request and push it to messages array
  //   console.log('Got a POST request');
  //   messages.push(request.body.message);
  //   response.end('OK');
  // }
  //   // response.end('OK');

  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
  // response.end();

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

//LAUREN
//here ive added the request handler to the exports
exports.requestHandler = requestHandler;


