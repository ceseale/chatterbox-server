chatterbox-server-notes

overview:
basic-server.js
  this file creates a server on a given port and IP
  it continues to listen for requests until I quit it from terminal

request-handler.js
  this is the function that will handle all incoming requests,
  including POST and GET
  it takes 2 params:
    request
    response

tasks:
1. set up exporting from request-handler DONE
2. set up require on basic-server DONE

3. hook up my local chat client to this server
  - try sending a request

questions:
1. where are the 2 GET requests in the terminal coming from?
