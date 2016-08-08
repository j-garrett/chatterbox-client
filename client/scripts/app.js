// YOUR CODE HERE:


var app = {};
app.init = function() {};
app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent');
    },
    error: function(data) {
      console.error('chatterbox; Failed to send message', data);
    }
  });
};
app.fetch = function() {
  $.ajax({
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message received');
    },
    error: function(data) {
      console.error('chatterbox; Failed to receive message', data);
    }
  });
};
app.clearMessages = function() {
  $('#chats').empty();
};
app.addMessage = function(message) {
  //create container for message
  var messageBox = $('<div class="message-box"></div>');
  //create components for message parts
  var user = $(`<div class="username">${message.username}:</div>`);
  var message = $(`<div class="message-text">${message.text}</div>`);

  messageBox.append(user, message);
  $('#chats').append(messageBox);
};
