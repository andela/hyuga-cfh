angular.module('mean.system')
.factory('chat', [function(){
    'use strict';

    var chat = {
        username : "",
        message : "",
        id: null,
        messageArray: []
    };

// // Checks that the Firebase SDK has been correctly setup and configured.
// if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
//   window.alert('You have not configured and imported the Firebase SDK. ' +
//     'Make sure you go through the codelab setup instructions.');
// } else if (config.storageBucket === '') {
//   window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
//     'actually a Firebase bug that occurs rarely. ' +
//     'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
//     'and make sure the storageBucket attribute is not empty. ' +
//     'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
//     'displayed there.');
// }

// Shortcuts to DOM Elements.
var messageList = document.getElementById('messages');
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message');

chat.username = window.user.name;
chat.id = window.user.id;

var database = firebase.database();

// Reference to the /messages/ database path.
var messagesRef = database.ref('messages');

// Loads previous 12 messages and listen for more
  messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    displayMessage(data.key, val.name, val.text);
  }.bind(this);
  messagesRef.limitToLast(12).on('child_added', setMessage);
  messagesRef.limitToLast(12).on('child_changed', setMessage);



chat.sendMessage = function(msg) {
    // Add a new message entry to the Firebase Database.
    messagesRef.push({
    name: chat.username,
    text: msg
    }).then(function() {
    }.bind(this)).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
    });
    // console.log(msg+" from "+chat.username);
};

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';


// Displays a Message in the UI.
var displayMessage = function(key, name, text) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    document.getElementById('messages').appendChild(div);
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  document.getElementById('message').focus();
};

    return chat;
}]);