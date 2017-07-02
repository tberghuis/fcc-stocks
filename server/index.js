require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// probably should name something else
const utils = require("./utils");

app.use(cors());

// https://stackoverflow.com/questions/9765215/global-variable-in-app-js-accessible-in-routes
// deal with another solution later
GLOB_SYMBOLS = [];

io.on("connection", function(socket) {
  socket.on("add symbol", async function(symbol) {
    symbol = symbol.toUpperCase().trim();
    // if exist exit
    if (GLOB_SYMBOLS.indexOf(symbol) > -1) {
      // emit ERROR only to single client
      socket.emit("add symbol error exists", symbol);
      return;
    }
    //validate symbol
    if (!await utils.asyncValidateSymbol(symbol)) {
      // emit ERROR only to single client
      socket.emit("add symbol error invalid", symbol);
      return;
    }
    //add to array if valid
    GLOB_SYMBOLS.push(symbol);
    // emit to all clients
    io.emit("add symbol", symbol);
  });

  socket.on("remove symbol", function(symbol) {
    symbol = symbol.toUpperCase().trim();
    // if !exist exit
    let index = GLOB_SYMBOLS.indexOf(symbol);
    if (index === -1) {
      return;
    }
    // remove from array
    GLOB_SYMBOLS.splice(index, 1);
    // emit to all clients
    io.emit("remove symbol", symbol);
  });
});

var routes = require("./routes");
app.use("/", routes);

server.listen(process.env.PORT, function() {
  console.log("server started!");
});
