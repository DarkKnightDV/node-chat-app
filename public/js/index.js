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

    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
}) ;

$('#message-form').on("submit", function(ev) {
    ev.preventDefault();
    socket.emit('createMessage', {
        from: "User",
        text: $("[name=message]").val()
    }, function (data) {
        console.log("Recieved:", data);
    });
    $("[name=message]").val("");
});

/* socket.emit('createMessage', {
    from: "jen@gmail.com",
    text: "Can we meet tomorrow instead?"
}, function (data) {
    console.log("Received", data);
    
}); */