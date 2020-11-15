import { tile_sheet } from "../variables/tile_sheet.js";
import { Collider } from "../classes/Collider.js";
import { world } from "../variables/world.js";


export function colliderObject(object) {
  var bottom, left, right, top, value;
  var collider = new Collider();
  
  top = Math.floor(object.getTop() / (tile_sheet.tile_size*4)); // First we test the top left corner of the object.
  left = Math.floor(object.getLeft() / (tile_sheet.tile_size*4));
  value = world.collision[top * world.columns + left];
  collider.collide(value, object, left * (tile_sheet.tile_size*4), top * (tile_sheet.tile_size*4), tile_sheet.tile_size*4);

  // We redifine top from the last collision check because the object may have moved. 
  top = Math.floor(object.getTop() / (tile_sheet.tile_size*4));
  right = Math.floor(object.getRight() / (tile_sheet.tile_size*4));
  value = world.collision[top * world.columns + right];
  collider.collide(value, object, right * (tile_sheet.tile_size*4), top * (tile_sheet.tile_size*4), tile_sheet.tile_size*4);

  bottom = Math.floor(object.getBottom() / (tile_sheet.tile_size*4));
  left = Math.floor(object.getLeft() / (tile_sheet.tile_size*4));
  value = world.collision[bottom * world.columns + left];
  collider.collide(value, object, left * (tile_sheet.tile_size*4), bottom * (tile_sheet.tile_size*4), tile_sheet.tile_size*4);

  bottom = Math.floor(object.getBottom() / (tile_sheet.tile_size*4));
  right = Math.floor(object.getRight() / (tile_sheet.tile_size*4));
  value = world.collision[bottom * world.columns + right];
  collider.collide(value, object, right * (tile_sheet.tile_size*4), bottom * (tile_sheet.tile_size*4), tile_sheet.tile_size*4);
}