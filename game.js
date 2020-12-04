import { Player } from "./classes/Player.js";
import { world } from "./variables/world.js";
import { controller } from "./variables/controller.js";
import { render } from "./functions/render.js";
import { canvasCreator } from "./functions/canvasCreator.js";
import { tile_sheet } from "./variables/tile_sheet.js";

export var ctx = canvasCreator();
export var height = window.innerHeight;
export var width = window.innerWidth;
export var player = new Player(world.start[0], world.start[1]);

var loop = function() {
  player.colliderObject();
  player.isJumping();
  player.isMoving();
  player.update();
  player.isFallingOutOfBounds(height);
  player.isMovingOutOfBounds(width);
  player.animation.update();
  render();
  window.requestAnimationFrame(loop); // call update when the browser is ready to draw again
};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
tile_sheet.image.addEventListener("load", function(event) {
  window.requestAnimationFrame(loop);
});
tile_sheet.image.src = "assets/tilesheet.png"