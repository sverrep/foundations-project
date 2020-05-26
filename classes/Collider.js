import { controller } from "/variables/controller.js";
import { player } from "/game.js";


export class Collider{

    collide(value, object, tile_x, tile_y, tile_size) {
  
      switch(value) { 
  
  
        case  1: // normal object with collision on all 4 sides
          if (this.collidePlatformTop(object, tile_y)) return;// If there's a collision, we don't need to check for anything else.
          if (this.collidePlatformRight(object, tile_x + tile_size)) return;
          if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
          this.collidePlatformLeft(object, tile_x); break;
        
        case 2: // ladder with no collision, but with a climbing mechanic that makes the y velocity increase to counter gravity, letting the player climb upwards
          if (controller.up) 
          {
            player.y_velocity -= 0.8;
            player.jumping = true;
        
          }
          break;
        
        case 3: // object that has no collision on the bottom, allowing for entry by ladder
          if (this.collidePlatformTop(object, tile_y)) return; // If there's a collision, we don't need to check for anything else.
          if (this.collidePlatformRight(object, tile_x + tile_size)) return;
          this.collidePlatformLeft(object, tile_x); break;
      }
        
  
    }
  
    collidePlatformBottom(object, tile_bottom) {
  
      /* If the top of the object is above the bottom of the tile and on the previous
      frame the top of the object was below the bottom of the tile, we have entered into
      the tile. */
      if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
  
        object.setTop(tile_bottom);// Move the top of the object to the bottom of the tile.
        object.velocity_y = 0;     // Stop moving up
        return true;               // Return true because there was a collision.
  
      } return false;              // Return false if there was no collision.
  
    }
  
    collidePlatformLeft(object, tile_left) {
  
      if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
  
        object.setRight(tile_left - 0.01); // -0.01 is to fix a problem with rounding
        object.velocity_x = 0; // stop moving left
        return true;
  
      } return false;
  
    }
  
    collidePlatformRight(object, tile_right) {
  
      if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
  
        object.setLeft(tile_right);
        object.velocity_x = 0; // stop oving right
        return true;
  
      } return false;
  
    }
  
    collidePlatformTop(object, tile_top) {
  
      if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
  
        object.setBottom(tile_top - 0.01);
        object.velocity_y = 0; // stop moving down
        object.jumping    = false;
        return true;
  
      } return false;
  
    }
  
  }

  export default class collider {};