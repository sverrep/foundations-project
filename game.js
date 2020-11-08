import { Player } from "./classes/Player.js";
import { world } from "./variables/world.js";
import { controller } from "./variables/controller.js"
import { colliderObject} from "./functions/colliderObject.js"
import { render } from "./functions/render.js";
import { canvasCreator } from "./functions/canvasCreator.js";
import { tile_sheet } from "./variables/tile_sheet.js";

export var ctx = canvasCreator();
export var height = window.innerHeight;
export var width = window.innerWidth;
export var sprite_size = 16;
export var player = new Player(world.start[0], world.start[1]);

var loop = function() {
  colliderObject(player);
  if (controller.up && player.jumping == false) {
    if(player.isMovingRight == false) // if character was last moving to the left jumps left
    {
      player.animation.change(tile_sheet.frame_sets[4], 10)
    }
    else // if character was last moving to the right jumps right
    {
      player.animation.change(tile_sheet.frame_sets[2], 10)
    }
    player.y_velocity -= 20;
    player.jumping = true;
  }

  if (controller.left) {
      if (!player.jumping){
        player.animation.change(tile_sheet.frame_sets[3], 10); // running animation to the left
      }
      player.x_velocity -= 0.5;
      player.isMovingRight = false;
    }
  
    if (controller.right) {
      if(!player.jumping){
        player.animation.change(tile_sheet.frame_sets[1], 10); // running animation to the right
      }
      player.x_velocity += 0.5;
      player.isMovingRight = true;
    }

    if (!controller.left && !controller.right && !player.jumping) { // If you're just standing still, change the animation to standing still.
      if (player.isMovingRight == false)
      {
        player.animation.change(tile_sheet.frame_sets[5], 20);
      }
      else
      {
        player.animation.change(tile_sheet.frame_sets[0], 20);
      }
    }

    player.y_velocity += 0.6;// gravity
    player.update();
    player.x_velocity *= 0.9;// friction
    player.y_velocity *= 0.9;// friction

  if (player.y > height - 64) { // if player is falling below floor line
      player.jumping = false;
      player.y = height - 60;
      player.y_velocity = 0;
      if (player.y == height-60)
      {
        player.x = world.start[0];
        player.y = world.start[1];
        player.isMovingRight = true;
      }
  }

    if (player.x < -60) {// if player is going off the left of the screen
        player.x = width;
    } 
    else if (player.x > width) { // if player goes past right boundary
        player.x = -60;
  }

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