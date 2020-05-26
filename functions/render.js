import { world } from "/variables/world.js";
import { player } from "/game.js";
import { tile_sheet } from "/game.js";
import { context } from "/game.js";
import { height } from "/game.js";
import { width } from "/game.js";
import { sprite_size } from "/game.js";


export function render() {

  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);// x, y, width, height
  context.imageSmoothingEnabled = false;
  for (let index = world.map.length - 1; index > -1; --index) { // calculating where to place tiles for the map to the screen
    
    // get the value of each tile in the map corresponding to the tiles in tilesheet.png
    var value = world.map[index];

    // this is the x and y location we cut the tile out from tilesheet.png
    var source_x = (value % tile_sheet.columns) * tile_sheet.tile_size;
    var source_y = Math.floor(value / tile_sheet.columns) * tile_sheet.tile_size;

    // this is the x and y location we draw the image
    var destination_x = (index % world.columns) * tile_sheet.tile_size;
    var destination_y = Math.floor(index / world.columns) * tile_sheet.tile_size;

    //draw the tile image
    context.drawImage(tile_sheet.image, source_x, source_y, tile_sheet.tile_size, tile_sheet.tile_size, destination_x*4, destination_y*4, tile_sheet.tile_size*4, tile_sheet.tile_size*4);

  }

  //checking if sprite is facing left or right and animating accordingly
  if (player.animation.frame_set == tile_sheet.frame_sets[3] || player.animation.frame_set == tile_sheet.frame_sets[4] || player.animation.frame_set == tile_sheet.frame_sets[5])
  {
    context.drawImage(tile_sheet.image, player.animation.frame * sprite_size, sprite_size, sprite_size, sprite_size, player.x, player.y, sprite_size*4, sprite_size*4);
  }
  else
  {
    context.drawImage(tile_sheet.image, player.animation.frame * sprite_size, 0, sprite_size, sprite_size, player.x, player.y, sprite_size*4, sprite_size*4);
  }

};