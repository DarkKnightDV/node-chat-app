var socket = io();

socket.on("connect", function () {
    console.log("Server connected");

   /*  socket.emit('createMessage', {
        from: "jen@gmail.com",
        text: "Can we meet tomorrow instead?"
    }); */
});
socket.on('disconnect', function () {
    console.log("Server disconnected.");
});

socket.on('newMessage', function(message){
    console.log("New Message", message);
}) ;
