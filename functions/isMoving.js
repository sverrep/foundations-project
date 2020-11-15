import { controller } from "../variables/controller.js";
import { tile_sheet } from "../variables/tile_sheet.js";

export function isMoving(player) {
  if (controller.left) {
    if (!player.jumping) {
      player.animation.change(tile_sheet.frame_sets[3], 10); // running animation to the left
    }
    player.x_velocity -= 0.5;
    player.isMovingRight = false;
  }
  if (controller.right) {
    if(!player.jumping) {
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
}