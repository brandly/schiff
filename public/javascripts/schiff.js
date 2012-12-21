/*
 * Schiff.js
 */

function MessageCtrl ($scope) {
  // Connect to socket at current address
  var socket = io.connect();

  $scope.sendMessage = function () {
    socket.emit('messageToServer', {
      text: $scope.newMessageText
    });

    $scope.newMessageText = '';
  };

  socket.on('messageToClient', function (data) {
    console.log(data.text);
  });
}
