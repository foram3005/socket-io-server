const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
var WebSocket = require('ws');
var _ = require('underscore');

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = async socket => {
    try {
    
      const ws =  new WebSocket('ws://stocks.mnet.website');
      ws.onopen = function() {}
      
      ws.onmessage = await function(obj) {
          socket.emit("FromAPI", obj.data);
      }
      ws.onclose = function() {}
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 500);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(port, () => console.log(`Listening on port ${port}`));