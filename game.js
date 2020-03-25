var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.fillStyle = "red";
c.fillRect(100, 855, 40, 40);
c.fillStyle = "#fff000";
c.fillRect(600, 800, 30, 100);
c.fillRect(800, 700, 30, 200);
c.fillRect(1000, 600, 30, 300);
