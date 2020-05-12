var context, controller, loop, world;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = window.innerHeight;
context.canvas.width = window.innerWidth;
height = context.canvas.height;
width = context.canvas.width;
const sprite_size = 16;


world = {

  // create a map for the world with values relating to which sprite is placed in the location
  map: [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 41, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 39, 45, 45, 39, 45, 45, 45, 35, 36, 37, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 35, 36, 36, 36, 37, 45, 45, 45, 45, 45, 39, 39, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
        45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45],
  columns:26,
  height:height,
  width:width,
  start:[100, 445],
  collision: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

}

collideObject = function(object){

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

class Collider{

  collide(value, object, tile_x, tile_y, tile_size) {

    switch(value) { // which value does our tile have?

      // All tile types can be described with only 4 collision methods. These methods are mixed and matched for each unique tile. 

      case  1: 
        if (this.collidePlatformTop(object, tile_y)) return;// If there's a collision, we don't need to check for anything else.
        if (this.collidePlatformRight(object, tile_x + tile_size)) return;
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
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

  class Animation { // class for sprite animations
  
  constructor (frame_set, delay) {

    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set;

  }

  change(frame_set, delay){
    
    if(this.frame_set != frame_set){
      this.count = 0;
      this.delay = delay;
      this.frame_index = 0;
      this.frame_set = frame_set;
      this.frame = this.frame_set[this.frame_index];

    }
  }

  update(){
    
    this.count ++; // how many cycles have passed since last update

      if (this.count >= this.delay){ // if enough cycles have passed change frame

        this.count = 0; // reset counter
        // if the frame index is on the last value of the frame set, reset to 0. If the frame index is not on the last value just add 1 to it.
        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index]; // change current frame value

      }

  }
}

class Player { // creating a class for the player object
  constructor (x, y) {
    this.height = 64;
    this.width = 64;
    this.x = x;
    this.x_old = x;
    this.y = y;
    this.y_old = y;
    this.jumping = true;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.animation = new Animation();
  }

  // methods to find characters position values
  getBottom()  { 
    return this.y + this.height; 
  }
  getLeft(){
    return this.x;
  }
  getRight()
  {
    return this.x + this.width;
  } 
  getTop(){
    return this.y;
  }
  getOldBottom(){
    return this.y_old + this.height;
  }
  getOldLeft(){
    return this.x_old;
  }
  getOldRight(){
    return this.x_old + this.width
  }
  getOldTop(){
    return this.y_old;
  }
  setBottom(y){
    this.y = y - this.height;
  }
  setLeft(x){
    this.x = x;
  }
  setRight(x){
    this.x = x - this.width;
  }
  setTop(y){
    this.y = y;
  }
  setOldBottom(y){
    this.y_old = y - this.height;
  }
  setOldLeft(x){
    this.x_old = x;
  }
  setOldRight(x){
    this.x_old = x - this.width;
  }
  setOldTop(y){
    this.y_old = y;
  }
  update() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }
}

  controller = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
  
      var key_state = (event.type == "keydown")?true:false;
  
      switch(event.keyCode) {
  
        case 37:// left key
          controller.left = key_state;
        break;
        case 38:// up key
          controller.up = key_state;
        break;
        case 39:// right key
          controller.right = key_state;
        break;
  
      }
  
    }
  
  };

  var player = new Player(world.start[0], world.start[1]);
  var collider = new Collider();
  var playerdir; // saving current last direction of player

  loop = function() {


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

      this.collideObject(this.player);

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

render = function() {

  context.fillStyle = "black";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);// x, y, width, height
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

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

var tile_sheet = {
  
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