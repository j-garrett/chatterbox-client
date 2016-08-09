var escapeText = function(string) {
  var fakeDiv = $('<div>').text(string);
  var escaped = fakeDiv.html();
  return escaped;
};

var app = {};
app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  app.user = window.location.href.split("username=").pop();
};

app.init();

app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {},
    error: function(data) {}
  });
};

app.fetch = function(room, user) {
  var params = JSON.stringify({ roomname: room, username: user });
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
    error: function(data) {}
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  //create container for message
  var messageBox = $(`<div class="panel panel-default message-box ${escapeText(message.roomname)}"></div>`);
  //create components for message parts
  var user = $(`<div class="panel-heading username">${escapeText(message.username)}:</div>`);
  var message = $(`<div class="panel-body message-text">${escapeText(message.text)}</div>`);

  messageBox.append(user, message);
  $('#chats').append(messageBox);
};

app.addRoom = function() {};





$(document).ready(function() {
  app.fetch('lobby');

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
    console.log('this value: ', $(this).text());
    var roomVal = $('select.rooms').val();

    app.fetch(roomVal);


    if (roomVal === 'add-room') {
      //create container for message
      var roomBox = $('<input type="text" class="room-name" placeholder="Name your room..."> </input>');
      var roomBtn = $('<button class="room-btn"> Create Room </button>');
      //create components for message parts
      $('#options').append(roomBox);
      $('#options').append(roomBtn);
    } else {
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
