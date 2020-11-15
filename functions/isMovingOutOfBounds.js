export function isMovingOutOfBounds(player, height, width) {
    if (player.y > height - 64) { // if player is falling below floor line
        player.jumping = false;
        player.y = height - 60;
        player.y_velocity = 0;
        if (player.y == height-60)
        {
          player.x = world.start[0];
          player.y = world.start[1];
          player.isMovingRight = true;
        }
    }
    if (player.x < -60) { // if player is going off the left of the screen
      player.x = width;
    } 
    else if (player.x > width) { // if player goes past right boundary
      player.x = -60;
  }
}