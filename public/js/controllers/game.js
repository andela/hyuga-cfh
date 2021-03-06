/* global angular Materialize */

angular.module('mean.system')
  .controller('GameController', [
    '$scope',
    'game',
    'chat',
    '$timeout',
    '$location',
    '$http',
    'MakeAWishFactsService',
    '$dialog', function ($scope, game, chat, $timeout,
    $location, $http, MakeAWishFactsService) {
      $scope.hasPickedCards = false;
      $scope.winningCardPicked = false;
      $scope.showTable = false;
      $scope.modalShown = false;
      $scope.game = game;
      $scope.chat = chat;
      $scope.pickedCards = [];
      var makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
      $scope.makeAWishFact = makeAWishFacts.pop();

      $scope.pickCard = function (card) {
        if (!$scope.hasPickedCards) {
          if ($scope.pickedCards.indexOf(card.id) < 0) {
            $scope.pickedCards.push(card.id);
            if (game.curQuestion.numAnswers === 1) {
              $scope.sendPickedCards();
              $scope.hasPickedCards = true;
            } else if (game.curQuestion.numAnswers === 2 &&
              $scope.pickedCards.length === 2) {
              // delay and send
              $scope.hasPickedCards = true;
              $timeout($scope.sendPickedCards, 300);
            }
          } else {
            $scope.pickedCards.pop();
          }
        }
      };

      $scope.pointerCursorStyle = function () {
        if ($scope.isCzar() && $scope.game.state === 'waiting for czar to decide') {
          return {
            'cursor': 'pointer'
          };
        }
        return {};
      };

      $scope.sendPickedCards = function () {
        game.pickCards($scope.pickedCards);
        $scope.showTable = true;
      };

      $scope.cardIsFirstSelected = function (card) {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[0];
        }
        return false;
      };

      $scope.cardIsSecondSelected = function (card) {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[1];
        }
        return false;
      };

      $scope.firstAnswer = function ($index) {
        return ($index % 2 === 0 && game.curQuestion.numAnswers > 1);
      };

      $scope.secondAnswer = function ($index) {
        return ($index % 2 === 1 && game.curQuestion.numAnswers > 1);
      };

      $scope.showFirst = function (card) {
        return game.curQuestion.numAnswers > 1 && $scope.pickedCards[0] === card.id;
      };

      $scope.showSecond = function (card) {
        return game.curQuestion.numAnswers > 1 && $scope.pickedCards[1] === card.id;
      };

      $scope.isCzar = function () {
        return game.czar === game.playerIndex;
      };

      $scope.isPlayer = function ($index) {
        return $index === game.playerIndex;
      };

      $scope.isCustomGame = function () {
        return !(/^\d+$/).test(game.gameID) && game.state === 'awaiting players';
      };

      $scope.isPremium = function ($index) {
        return game.players[$index].premium;
      };

      $scope.currentCzar = function ($index) {
        return $index === game.czar;
      };

      $scope.winningColor = function ($index) {
        if (game.winningCardPlayer !== -1 && $index === game.winningCard) {
          return $scope.colors[game.players[game.winningCardPlayer].color];
        }
        return '#f9f9f9';
      };

      $scope.pickWinning = function (winningSet) {
        if ($scope.isCzar()) {
          game.pickWinning(winningSet.card[0]);
          $scope.winningCardPicked = true;
        }
      };

      $scope.winnerPicked = function () {
        return game.winningCard !== -1;
      };

      $scope.startGame = function () {
        game.startGame();
      };

      $scope.abandonGame = function () {
        game.leaveGame();
        $location.path('/');
      };

    // Send message in group chat
      $scope.sendMessage = function () {
        var msg = document.getElementById('message').value;
        if (msg && msg.trim() !== '') {
        // pop up chat window if minimized.
          $scope.openChat = true;
          document.getElementById('unread').textContent = '';
          $scope.chat.sendMessage(msg);
        }
      };

    // Resize chat panel
      $scope.resize = function () {
        if (!$scope.openChat) {
          $scope.openChat = true;
          // clear chat badge
          document.getElementById('unread').textContent = '';
        } else {
          $scope.openChat = false;
        }
      };

    // Catches changes to round to update when no players pick card
    // (because game.state remains the same)
      $scope.$watch('game.round', function () {
        $scope.hasPickedCards = false;
        $scope.showTable = false;
        $scope.winningCardPicked = false;
        $scope.makeAWishFact = makeAWishFacts.pop();
        if (!makeAWishFacts.length) {
          makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
        }
        $scope.pickedCards = [];
      });

    // In case player doesn't pick a card in time, show the table
      $scope.$watch('game.state', function () {
        if (game.state === 'waiting for czar to decide' && $scope.showTable === false) {
          $scope.showTable = true;
        }
      });

      $scope.$watch('game.gameID', function () {
        if (game.gameID && game.state === 'awaiting players') {
        // Clear the chat history if player is first to join room
          if (game.playerIndex === 0) {
            $scope.chat.clearMessage();
          }

          if (!$scope.isCustomGame() && $location.search().game) {
            // If the player didn't successfully enter the request room,
            // reset the URL so they don't think they're in the requested room.
            $location.search({});
          } else if ($scope.isCustomGame() && !$location.search().game) {
            // Once the game ID is set, update the URL if this is a game with friends,
            // where the link is meant to be shared.
            $location.search({
              game: game.gameID
            });
            if (!$scope.modalShown) {
              setTimeout(function () {
                var link = document.URL;
                var txt = 'Give the following link to your friends so they can join your game: ';
                $('#lobby-how-to-play').text(txt);
                $('#oh-el').css({
                  'text-align': 'center',
                  'font-size': '22px',
                  'background': 'white',
                  'color': 'black'
                }).text(link);

                Materialize.toast('You need to invite a minimum of 3 players', 10000);
              }, 200);
              $scope.modalShown = true;
            }
          }
        }
      });

      // Handles ng-click event to start new round
      $scope.beginNextRound = function () {
        if ($scope.isCzar()) {
          game.beginNextRound();
        }
      };

      $scope.checkState = function (state) {
        switch (state) {
        case 'gameEndPeopleLeft':
          return game.state === 'game dissolved' && game.gameWinner === -1;
        case 'gameNotOn':
          return game.state === 'game ended' ||
            game.state === 'game dissolved' || game.state === 'awaiting players';
        case 'youWon':
          return game.state === 'game ended' &&
            game.gameWinner === game.playerIndex;
        case 'youLost':
          return game.state === 'game ended' &&
            game.gameWinner !== game.playerIndex;
        case 'gameCanStart':
          return (game.playerIndex === 0 || game.joinOverride) &&
            game.players.length >= game.playerMinLimit;
        case 'noGame':
          return game.state === 'game ended' ||
            game.state === 'game dissolved';
        case 'canCzar':
          return game.table.length === 0 && game.state !== 'game dissolved' &&
            game.state !== 'awaiting players';
        case 'canNotPickCard':
          return game.state === 'game ended' ||
            game.state === 'game dissolved';
        case 'gameends':
          return game.state === 'game ended' ||
            game.state === 'game dissolved';
        case 'awaiting-players':
          return game.state === 'awaiting players';
        default:
          return false;
        }
      };

      if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
        game.joinGame('joinGame', $location.search().game);
      } else if ($location.search().custom) {
        game.joinGame('joinGame', null, true);
      } else {
        game.joinGame();
      }

      $scope.clearMessage = function () {
        $timeout(function () {
          $scope.action = false;
        }, 5000);
      };

      $scope.addFriend = function (friendid) {
        $scope.action = {};
        $http.post('/api/friend', {
          friendid: friendid
        }).then(function (response) {
          if (response.status === 200) {
            $scope.action.done = true;
          }
          $scope.action.message = response.data.message;
          $scope.clearMessage();
        }, function (error) {
          $scope.action.message = error.data.message;
          $scope.clearMessage();
        });
      };

      $scope.getPlayerId = function () {
        var userDetails = {};
        userDetails = JSON.parse(localStorage.getItem('user'));
        return (userDetails) ? userDetails._id : false;
      };

      $scope.isAddable = function (playerID) {
        var userID = $scope.getPlayerId();
        return playerID !== 'unauthenticated' &&
          playerID !== userID && userID;
      };

      // get friend list and populate in the select option
      try {
        $scope.friendList = JSON.parse(localStorage.getItem('friends'));
      } catch (error) {
        $scope.friendList = [];
      }

      $scope.invitePlayers = function () {
        if ($scope.invited.length < 12) {
          var gameUrl = document.URL.split('/');
          $http.post('/api/invite', {
            invitedIDs: $scope.invited,
            link: '#!/' + gameUrl[(gameUrl.length) - 1]
          })
          .then(function () {
            $scope.action = {done: true, message: 'Invitation sent'};
          }, function () {
            $scope.action = {message: 'Invitation not sent'};
          });
          $scope.clearMessage();
        } else {
          Materialize.toast('You can only invite a maximum of 11 players', 10000);
        }
      };
    }]);
