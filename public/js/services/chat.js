angular.module('mean.system')
.factory('chat', [function(){
    'use strict';

    var chat = {
        username : "",
        message : ""
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

chat.username = window.user.name;

console.log(firebase);

var database = firebase.database();

// Reference to the /messages/ database path.
var messagesRef = database.ref('messages');

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


    // window.user that us an object that holds our gamers name
    // return 'Ẁelcome '+ window.user.name;

    // sendMessage = function (data) {
    //     console.log(data);
    // };

    // var submitButton = document.getElementById('submitChat');
    // submitButton.onclick = saveMessage();

    // function saveMessage(e){
    //     // e.preventDefault();
    //     console.log(window.user.name);
    // }

    // function CfhChat(){
    //       // Shortcuts to DOM Elements.
    //         this.messageList = document.getElementById('messages');
    //         this.messageForm = document.getElementById('message-form');
    //         this.messageInput = document.getElementById('message');
    //         // this.submitButton = document.getElementById('submitChat');

    //     // Saves message on form submit.
    //     // this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

    //     // Saves a new message on the Firebase DB.
    //     function saveMessage(e){
    //         e.preventDefault();
    //         console.log(window.user.name);
    //     }
    //     // CfhChat.prototype.saveMessage = function(e) {
    //     // e.preventDefault();
    //     // console.log(game.players, userID, window.user.name);
    //     // // Check that the user entered a message and is signed in.
    //     // // if (this.messageInput.value) {
    //     // //     // Add a new message entry to the Firebase Database.
    //     // //     this.messagesRef.push({
    //     // //     name: window.user,
    //     // //     text: this.messageInput.value,
    //     // //     photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
    //     // //     }).then(function() {
    //     // //     // Clear message text field and SEND button state.
    //     // //     FriendlyChat.resetMaterialTextfield(this.messageInput);
    //     // //     this.toggleButton();
    //     // //     }.bind(this)).catch(function(error) {
    //     // //     console.error('Error writing new message to Firebase Database', error);
    //     // //     });
    //     // // }
    //     // };
    // }
    return chat;
}]);