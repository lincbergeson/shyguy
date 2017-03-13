var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case "ArrowUp":
      movement.up = true;
      break;
    case "ArrowDown":
      movement.down = true;
      break;
    case "ArrowLeft":
      movement.left = true;
      break;
    case "ArrowRight":
      movement.right = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.code) {
    case "ArrowUp":
      movement.up = false;
      break;
    case "ArrowDown":
      movement.down = false;
      break;
    case "ArrowLeft":
      movement.left = false;
      break;
    case "ArrowRight":
      movement.right = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000/60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
