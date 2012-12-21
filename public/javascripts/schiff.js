/*
 * Schiff.js
 */

!function (window, jQuery, undefined) {

  // Connect to socket at current address
  var socket = io.connect();

  $('#form').submit(function (e) {
    var input = $('#message-input'),
        text = input.val();
    input.val('');

    socket.emit('messageToServer', {
      text: text
    });
    return false;
  });

  socket.on('messageToClient', function (data) {
    console.log(data.text);
  });

}(window, jQuery);
