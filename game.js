var context, controller, player, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = window.innerHeight - 40;
context.canvas.width = window.innerWidth;
height = context.canvas.height;
width = context.canvas.width;
const sprite_size = 16;

  class Animation {
  
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

player = {

  height:60,
  jumping:true,
  width:60,
  x:144, 
  x_velocity:0,
  y:height-60,
  y_velocity:0,
  animation:new Animation()

};

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

  var playerdir; // saving current last direction of player

  loop = function() {


    if (controller.up && player.jumping == false) {
      if(playerdir == "left") // if character was last moving to the left jumps left
      {
        player.animation.change(sprite_player.frame_sets[4], 10)
      }
      else // if character was last moving to the right jumps right
      {
        player.animation.change(sprite_player.frame_sets[2], 10)
      }
      player.y_velocity -= 20;
      player.jumping = true;
  
    }

    if (controller.left) {
        if (!player.jumping){
          player.animation.change(sprite_player.frame_sets[3], 20); // running animation to the left
        }
        player.x_velocity -= 0.4;
        playerdir = "left";
    
      }
    
      if (controller.right) {
        if(!player.jumping){
          player.animation.change(sprite_player.frame_sets[1], 10); // running animation to the right
        }
        player.x_velocity += 0.5;
        playerdir = "right";
    
      }

       /* If you're just standing still, change the animation to standing still. */
      if (!controller.left && !controller.right && !player.jumping) {
        if (playerdir == "left")
        {
          player.animation.change(sprite_player.frame_sets[5], 20);
        }
        else
        {
          player.animation.change(sprite_player.frame_sets[0], 20);
        }

      }

      player.y_velocity += 0.7;// gravity
      player.x += player.x_velocity;
      player.y += player.y_velocity;
      player.x_velocity *= 0.9;// friction
      player.y_velocity *= 0.9;// friction

    // if player is falling below floor line
    if (player.y > height - 60) {

        player.jumping = false;
        player.y = height - 60;
        player.y_velocity = 0;

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

  context.fillStyle = "rgb(118,146,186)";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);// x, y, width, height
  context.imageSmoothingEnabled = false;
  //checking if sprite is facing left or right
  if (player.animation.frame_set == sprite_player.frame_sets[3] || player.animation.frame_set == sprite_player.frame_sets[4] || player.animation.frame_set == sprite_player.frame_sets[5])
  {
    context.drawImage(sprite_player.image, player.animation.frame * sprite_size, sprite_size, sprite_size, sprite_size, player.x, player.y, sprite_size*4, sprite_size*4);
  }
  else
  {
    context.drawImage(sprite_player.image, player.animation.frame * sprite_size, 0, sprite_size, sprite_size, player.x, player.y, sprite_size*4, sprite_size*4);
  }

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

var sprite_player = {
  
  frame_sets: [[0],[3,4,5],[7], [2,1,0], [3], [4]], // standing still facing right, walking right, jumping right, walking left, jumping left, standing still facing left
  image:new Image()

}

sprite_player.image.addEventListener("load", function(event) {
  window.requestAnimationFrame(loop);
});
sprite_player.image.src = "assets/player.png"