angular.module('mean.system')
  .factory('chat', [function() {
    'use strict';

    var chat = {
      username: "",
      message: "",
      id: null,
      messageArray: [],
      unreadMsg: 0
    };

    if (!window.user) {
      chat.username = 'guest';
    } else {
      chat.username = window.user.name;
      chat.id = window.user.id;
    }

    chat.unreadMsg = 0;
    var messagesRef;

    chat.createDB = function(gameID) {

      var database = firebase.database();


      // Create a chat db for this session.
      messagesRef = database.ref('messages/' + gameID);

      // Cancel previous message listeners
      messagesRef.off();

      // Loads the messages and listen for new ones.
      var setMessage = function(data) {
        var val = data.val();
        chat.displayMessage(data.key, val.name, val.text);
      }.bind(this);
      messagesRef.limitToLast(12).on('child_added', setMessage);
      messagesRef.limitToLast(12).on('child_changed', setMessage);
      messagesRef.on('child_added', function() {
        chat.unreadMsg++;
      });

    };

    chat.sendMessage = function(msg) {
      // Add a new message entry to the Firebase Database.
      messagesRef.push({
        name: chat.username,
        text: msg
      }).then(function() {}.bind(this)).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });
      document.getElementById('message-form').reset();
    };

    // Clear messages when a new game startsS
    chat.clearMessage = function() {
      messagesRef.remove()
        .then(function() {
          // Do nothing after removing chats
        })
        .catch(function(err) {
          console.log('Could not clear previous chats' + err.message);
        });
    };

    // Template for messages.
    var MESSAGE_TEMPLATE = '<div class="message-container">' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
      '</div>';


    // Displays a Message in the UI.
    chat.displayMessage = function(key, name, text) {
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
      if (window.user && (name !== window.user.name)) {
        document.getElementById('unread').setAttribute('data-badge', chat.unreadMsg + 1);
      }
      setTimeout(function() {
        div.classList.add('visible');
      }, 1);
      document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
      document.getElementById('message').focus();
    };

    return chat;
  }]);