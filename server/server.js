const express = require('express');
const path = require('path');
const http = require('http');
const socketIO =  require('socket.io');

const {generateMessage} = require('./utils/messages');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var  io = socketIO(server);

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("Client Connected");

    socket.on('disconnect', () => {
        console.log("Client Disconnected");
    });

    socket.broadcast.emit('newMessage', generateMessage("Admin","New User Joined"));

    socket.emit('newMessage', generateMessage("Admin","Welcome to chat app!"));

    socket.on('createMessage', (message) => {
        console.log("Create Message", message);
       /*  io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().toDateString()
        }); */

        
    });

   /*  socket.emit("newMessage", {
        from: "deep@gmail.com",
        text: "I am available at 4:00 PM. How about you?",
        createdAt: new Date().toDateString()
    }); */
});


server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})
