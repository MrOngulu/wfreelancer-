const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// SOCKET.IO SETUP (REAL-TIME)
// ======================
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"]
  }
});

// make io accessible in routes/controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ======================
// MongoDB
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ======================
// ROUTES
// ======================
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// ======================
// START SERVER
// ======================
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});