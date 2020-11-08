import { controller } from "../variables/controller.js";


export class Collider{

    collide(value, player, tile_x, tile_y, tile_size) {
      switch(value) { 
        case  1: // normal object with collision on all 4 sides
          if (this.collidePlatformTop(player, tile_y)) return;// If there's a collision, we don't need to check for anything else.
          player.jumping = true;
          if (this.collidePlatformRight(player, tile_x + tile_size)) return;
          if (this.collidePlatformBottom(player, tile_y + tile_size)) return;
          this.collidePlatformLeft(player, tile_x); break;
        
        case 2: // ladder with no collision, but with a climbing mechanic that makes the y velocity increase to counter gravity, letting the player climb upwards
          if (controller.up) 
          {
            player.y_velocity -= 0.7;
            player.jumping = true;
          }
          break;
        
        case 3: // object that has no collision on the bottom, allowing for entry by ladder
          if (this.collidePlatformTop(player, tile_y)) return; // If there's a collision, we don't need to check for anything else.
          if (this.collidePlatformRight(player, tile_x + tile_size)) return;
          this.collidePlatformLeft(player, tile_x); break;
      }
    }
  
    collidePlatformBottom(player, tile_bottom) {
      if (player.getTop() < tile_bottom && player.getOldTop() >= tile_bottom) {
        player.setTop(tile_bottom);// Move the top of the player to the bottom of the tile.
        player.y_velocity = 0;     // Stop moving up
        return true;               // Return true because there was a collision.
      } 
      return false;              // Return false if there was no collision.
    }
  
    collidePlatformLeft(player, tile_left) {
  
      if (player.getRight() > tile_left && player.getOldRight() <= tile_left) {
        player.setRight(tile_left);
        player.x_velocity = 0; // stop moving left
        return true;
      } 
      return false;
    }
  
    collidePlatformRight(player, tile_right) {
      if (player.getLeft() < tile_right && player.getOldLeft() >= tile_right) {
        player.setLeft(tile_right);
        player.x_velocity = 0; // stop moving right
        return true;
      } 
      return false;
    }
  
    collidePlatformTop(player, tile_top) {
      if (player.getBottom() > tile_top && player.getOldBottom() <= tile_top) {
        player.setBottom(tile_top - 0.5);
        player.y_velocity = 0; // stop moving down
        player.jumping = false;
        return true;
      } 
      return false;
    }
  }
  export default class collider {};