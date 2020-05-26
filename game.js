import { Collider } from "/classes/Collider.js";
import { Animation } from "/classes/Animation.js";
import { Player } from "/classes/Player.js";
import { world } from "/variables/world.js";
import { controller } from "/variables/controller.js"
import { collideObject} from "/functions/colliderObject.js"
import { render } from "/functions/render.js";

export var context = document.querySelector("canvas").getContext("2d");
context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;
export var height = context.canvas.height;
export var width = context.canvas.width;
export var sprite_size = 16;


export var player = new Player(world.start[0], world.start[1]);
export var collider = new Collider();
var playerdir; // saving current last direction of player

var loop = function() {
  if (controller.up && player.jumping == false) {
    if(playerdir == "left") // if character was last moving to the left jumps left
    {
      player.animation.change(tile_sheet.frame_sets[4], 10)
    }
    else // if character was last moving to the right jumps right
    {
      player.animation.change(tile_sheet.frame_sets[2], 10)
    }
    player.y_velocity -= 25;
    player.jumping = true;

  }

  if (controller.left) {
      if (!player.jumping){
        player.animation.change(tile_sheet.frame_sets[3], 10); // running animation to the left
      }
      player.x_velocity -= 0.5;
      playerdir = "left";
  
    }
  
    if (controller.right) {
      if(!player.jumping){
        player.animation.change(tile_sheet.frame_sets[1], 10); // running animation to the right
      }
      player.x_velocity += 0.5;
      playerdir = "right";
  
    }

      /* If you're just standing still, change the animation to standing still. */
    if (!controller.left && !controller.right && !player.jumping) {
      if (playerdir == "left")
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

    collideObject(player);

  // if player is falling below floor line
  if (player.y > height - 64) {

      player.jumping = false;
      player.y = height - 60;
      player.y_velocity = 0;
      if (player.y == height-60)
      {
        player.x = world.start[0];
        player.y = world.start[1];
      }

  }

    // if player is going off the left of the screen
    if (player.x < -60) {

        player.x = width;

    } 
    else if (player.x > width) {// if player goes past right boundary

        player.x = -60;

  }

    player.animation.update();
    
    render();

    // call update when the browser is ready to draw again
    
    window.requestAnimationFrame(loop);


};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

export var tile_sheet = {
  
  frame_sets: [[0],[3,4,5],[7], [2,1,0], [3], [4]], // standing still facing right, walking right, jumping right, walking left, jumping left, standing still facing left
  image:new Image(),
  columns:10,
  rows:[3,4,5],
  tile_size:16

}

tile_sheet.image.addEventListener("load", function(event) {
  window.requestAnimationFrame(loop);
});
tile_sheet.image.src = "assets/tilesheet.png"