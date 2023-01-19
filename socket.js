const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://127.0.0.1:8000",
        methods: ["GET","POST"],
    }
})

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on('user_loggedIn', (data)=>{
        console.log(data)
    })
})

server.listen(8001, ()=>{
    console.log("Server is running")
})
