import { controller } from "../variables/controller.js";
import { tile_sheet } from "../variables/tile_sheet.js";

export function isJumping(player) {
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
}