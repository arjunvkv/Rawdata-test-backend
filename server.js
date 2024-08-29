const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // Handle the castImage event
  socket.on("castImage", (data) => {
    socket.broadcast.emit("castImage", data); // Broadcast image data to other clients
  });

  // Handle the draw event
  socket.on("draw", (drawingData) => {
    socket.broadcast.emit("draw", drawingData); // Broadcast drawing data to other clients
  });

  socket.on("clearDrawings", (drawingData) => {
    socket.broadcast.emit("clearDrawings"); // Broadcast drawing data to other clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
