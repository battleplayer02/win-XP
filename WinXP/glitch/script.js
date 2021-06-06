var win = document.getElementById('window');
var win_img = document.getElementById('win_img');
var bar = document.getElementById('bar');
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




bar.onmousedown = function (e) {
  // Set the initial offset between the cursor and the window's top left.
  var loc = win.getBoundingClientRect();
  var ox = e.clientX - loc.left;
  var oy = e.clientY - loc.top;

  document.body.onmousemove = function (e) {
    var loc = win.getBoundingClientRect();
    // The actual image size is 800x600.
    ctx.drawImage(win_img, 0, 0, 800, 600, loc.left, loc.top, loc.width, loc.height);
    var x = e.clientX - ox;
    var y = e.clientY - oy;

    win.style.left = x + 'px';
    win.style.top = y + 'px';
  }

  document.body.onmouseup = function () {
    document.body.onmousemove = '';
  }
}

window.onresize = function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}