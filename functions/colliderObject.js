import { Collider } from "/classes/Collider.js";
import { sprite_size } from "/game.js";
import { collider } from "/game.js"
import { world } from "/variables/world.js";


export function collideObject(object){

    var bottom, left, right, top, value;
  
    // First we test the top left corner of the object.
    top    = Math.floor(object.getTop()    / (sprite_size*4));
    left   = Math.floor(object.getLeft()   / (sprite_size*4));
    value  = world.collision[top * world.columns + left];
    collider.collide(value, object, left * (sprite_size*4), top * (sprite_size*4), sprite_size*4);
  
    // We must redifine top since the last collision check because the object may have moved since the last collision check. 
    top    = Math.floor(object.getTop()    / (sprite_size*4));
    right  = Math.floor(object.getRight()  / (sprite_size*4));
    value  = world.collision[top * world.columns + right];
    collider.collide(value, object, right * (sprite_size*4), top * (sprite_size*4), sprite_size*4);
  
    bottom = Math.floor(object.getBottom() / (sprite_size*4));
    left   = Math.floor(object.getLeft()   / (sprite_size*4));
    value  = world.collision[bottom * world.columns + left];
    collider.collide(value, object, left * (sprite_size*4), bottom * (sprite_size*4), sprite_size*4);
  
  
    bottom = Math.floor(object.getBottom() / (sprite_size*4));
    right  = Math.floor(object.getRight()  / (sprite_size*4));
    value  = world.collision[bottom * world.columns + right];
    collider.collide(value, object, right * (sprite_size*4), bottom * (sprite_size*4), sprite_size*4);
  
  }