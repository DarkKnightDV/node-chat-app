const express = require('express');
const path = require('path');
const http = require('http');
const socketIO =  require('socket.io');

const {Users} = require('./utils/users');
const {generateMessage, generateLocationMegitssage} = require('./utils/messages');
const {isRealString} = require('./utils/validation');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var  io = socketIO(server);
var users = new Users();

var publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', `${user.name} has left.`)
        }
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name & Room are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name, params.room);
        socket.emit('newMessage', generateMessage("Admin","Welcome to chat app!"));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin",`${params.name} joined this chat.`));
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        callback();

        // socket.leave(params.room)  // To leave room
        //io.emit ==> io.to(params.room).emit()
        //socket.broadcast.emit ==> socket.broadcast.to(params.room).emit()
        // socket.broadcast.emit('newMessage', generateMessage("Admin","New User Joined"));
        // socket.emit('newMessage', generateMessage("Admin","Welcome to chat app!"));
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit("newMessage", generateMessage(message.from,message.text));
        callback("Acknowledged, no errors!");
    });

    socket.on("createLocationMessage", (coords) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
    });
});

server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})
