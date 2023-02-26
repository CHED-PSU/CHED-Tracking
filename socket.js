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

    socket.on('user_loggedIn', (data)=>{
        socket.broadcast.emit("User_Notif",data)
        console.log(data.message)
    })

    socket.on('User_Accept', ({message}) => {
        io.emit('Admin_Notif', {message:message})
    })

    socket.on('User_return_item', (message) => {
        io.emit('Admin_Notif', {message:message})
    }) 

    socket.on('Admin_accept', (message) => {
        io.emit('user_notif', {message:message})
    })
})

server.listen(8001, ()=>{
    console.log("Server is running") 
})
