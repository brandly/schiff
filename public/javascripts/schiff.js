/*
 * Schiff.js
 */

var app = angular.module('schiff', []);

// I don't fully understand, but this is needed to keep socket in
// the right scope for angular to use it.
// http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

function MessageCtrl ($scope, socket) {

  $scope.messages = [];

  $scope.sendMessage = function () {
    var text = $scope.newMessageText;
    if (text !== '') {
      socket.emit('messageToServer', {
        text: text
      });

      $scope.newMessageText = '';
    }
  };

  $scope.incomingHandler = function (data) {
    $scope.messages.unshift({
      text: data.text
    });
  };

  socket.on('messageToClient', $scope.incomingHandler);
}
