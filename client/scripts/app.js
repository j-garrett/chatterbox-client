// YOUR CODE HERE:
// var Parse = require('parse');
// Parse.initialize("jon&vincent");
// Parse.serverUrl = 'https://api.parse.com/1/classes/messages';

// var App = Parse.Object.extend("App");
//$(document).ready(function() {
var escapeText = function(string) { 
  var fakeDiv = $('<div>').text(string);
  var escaped = fakeDiv.html();
  return escaped;
};

var app = {};
app.server = 'https://api.parse.com/1/classes/messages';    

app.init = function(){
  app.user = window.location.href.split("username=").pop();
};

app.init();

app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
    },
    error: function(data) {
    }
  });
};

app.fetch = function(room, user) {
  var params = JSON.stringify({"roomname":'lobby'});
  console.log(`https://api.parse.com/1/classes/messages?where=${params}`);
  //debugger;
  $.ajax({
    url: `https://api.parse.com/1/classes/messages?where=${params}`,    
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
      // Put on the DOM
      _.each(data.results, function(item) {
        app.addMessage(item);
      });
    },
    error: function(data) {
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  //create container for message
  var messageBox = $(`<div class="message-box ${escapeText(message.roomname)}"></div>`);
  //create components for message parts
  var user = $(`<div class="username">${escapeText(message.username)}:</div>`);
  var message = $(`<div class="message-text">${escapeText(message.text)}</div>`);

  messageBox.append(user, message);
  $('#chats').append(messageBox);
};

app.addRoom = function() {};

$(document).ready(function() {
  app.fetch();

  var sendMessage = function() {
    var message = {
      username: app.user,
      text: $('.enter-text').val(),
      roomname: $('select.rooms').val()
    };
    app.send(message);
  };
  $('.send').on('click', sendMessage);

  var changeRoom = function() {
    $('.message-box').fadeOut();
    app.fetch();
    var roomVal = $('select.rooms').val();

    if (roomVal === 'add-room') {
      //create container for message
      var roomBox = $('<input type="text" class="room-name" placeholder="Name your room..."> </input>');
      var roomBtn = $('<button class="room-btn"> Create Room </button>');
      //create components for message parts
      $('#options').append(roomBox);
      $('#options').append(roomBtn);
    } else {
      console.log(roomVal);
      $(`.${roomVal}`).fadeIn();
    }

  };

  $('select.rooms').on('change', changeRoom);
  $('#options').on('click', '.room-btn', function() {
    var newRoomName = $('.room-name').val();
    $('select.rooms').prepend(`<option selected value="${newRoomName}">${newRoomName}</option>`);
    $('.room-name').remove();
    $('.room-btn').remove();
  });

});


