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
    // var li = $("<li></li>");
    // li.text(`${message.from} (${moment(message.completedAt).format('h:mm a')}): ${message.text}`);
    // $("#messages").append(li);
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        completedAt: moment(message.completedAt).format('h:mm a')
    });
    $("#messages").append(html);
    scrollToBottom ();
}) ;

socket.on("newLocationMessage", function (message){
    // var li = $("<li></li>");
    // var a = $("<a target='_blank'>My Current Location</a>");
    // li.text(`${message.from} (${moment(message.completedAt).format('h:mm A')}): `);
    // a.attr('href', message.url);
    // li.append(a);
    // $("#messages").append(li);
    var template = $('#message-location-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        completedAt: moment(message.completedAt).format('h:mm a'),
        url: message.url
        // text: `<a target="_blank" href=${message.url}>My Location</a>`
    });
    $("#messages").append(html);
    scrollToBottom ();
});

function scrollToBottom () {
    var messages = $('#messages');
    var lastMessage = $(messages).children('li:last-child');

    var scrollHeight = $(messages).prop('scrollHeight');
    var scrollTop = $(messages).prop('scrollTop');
    var clientHeight = $(messages).prop('clientHeight');
    var newMessageHeight = $(lastMessage).innerHeight();
    var prevMsgHeight = $(lastMessage).prev().innerHeight();

    if((clientHeight + scrollTop + newMessageHeight + prevMsgHeight) >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

$('#message-form').on("submit", function(ev) {
    ev.preventDefault();
    var messageText = $("[name=message]");
    if(messageText.val() !== "") {
        socket.emit('createMessage', {
            from: "User",
            text: messageText.val()
        }, function (data) {
            messageText.val("");
        });
    }
});

$("#send-location").on("click", function () {
    var sendLocBtn = $(this);
    if(!navigator.geolocation) {
        return alert("Sorry, geolocation not supported by browser");
    }
    $(sendLocBtn).attr('disabled', "true").text('Sending location...');
        navigator.geolocation.getCurrentPosition(function (position){
            $(sendLocBtn).removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
    }, function () {
        $(sendLocBtn).removeAttr('disabled').text('Send location');
        alert("Unable to get geolocation.");
    });
});

/* socket.emit('createMessage', {
    from: "jen@gmail.com",
    text: "Can we meet tomorrow instead?"
}, function (data) {
    console.log("Received", data);
    
}); */