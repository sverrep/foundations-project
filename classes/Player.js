import { Animation } from "./Animation.js";
import { controller } from "../variables/controller.js";
import { tile_sheet } from "../variables/tile_sheet.js";
import { world } from "../variables/world.js";

export class Player { // creating a class for the player object
  constructor (x, y) {
    this.height = 64;
    this.width = 64;
    this.x = x;
    this.x_old = x;
    this.y = y;
    this.y_old = y;
    this.jumping = false;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.animation = new Animation(tile_sheet.frame_sets[0], 20);
    this.isMovingRight = true; 
  }
  isMoving() {
    if (controller.left) {
      if (!this.jumping) {
        this.animation.change(tile_sheet.frame_sets[3], 10); // running animation to the left
      }
      this.x_velocity -= 0.5;
      this.isMovingRight = false;
      return true;
    }
    if (controller.right) {
      if (!this.jumping) {
        this.animation.change(tile_sheet.frame_sets[1], 10); // running animation to the right
      }
      this.x_velocity += 0.5;
      this.isMovingRight = true;
      return true;
    }
    if (!controller.left && !controller.right && !this.jumping) { // If you're just standing still, change the animation to standing still.
      if (this.isMovingRight == false)
      {
        this.animation.change(tile_sheet.frame_sets[5], 20);
      }
      else
      {
        this.animation.change(tile_sheet.frame_sets[0], 20);
      }
      return false;
    }
  }
  isJumping() {
    if (controller.up && this.jumping == false) {
      if(this.isMovingRight == false) // if character was last moving to the left jumps left
      {
        this.animation.change(tile_sheet.frame_sets[4], 10)
      }
      else // if character was last moving to the right jumps right
      {
        this.animation.change(tile_sheet.frame_sets[2], 10)
      }
      this.y_velocity -= 20;
      this.jumping = true;
      return true;
    } 
  }
  isFallingOutOfBounds(height) {
    if (this.y > height - 64) { // if player is falling below floor line
      this.jumping = false;
      this.y_velocity = 0;
      this.x = world.start[0];
      this.y = world.start[1];
      this.isMovingRight = true;
      return true;
    }
  }
  isMovingOutOfBounds(width) {
    if (this.x < -60) { // if player is going off the left of the screen
      this.x = width;
      return true;
    } 
    else if (this.x > width) { // if player goes past right boundary
      this.x = -60;
      return true;
    }
  }
  updatePlayer() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.y_velocity += 0.6;// gravity
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.x_velocity *= 0.9;// friction
    this.y_velocity *= 0.9;// friction
    this.animation.updateAnimation();
  }
  collide(value, tile_x, tile_y, tile_size) {
    switch(value) { 
      case  1: // normal object with collision on all 4 sides
        if (this.collidePlatformTop(tile_y)) return;
        this.jumping = true;
        if (this.collidePlatformRight(tile_x + tile_size)) return;
        if (this.collidePlatformBottom(tile_y + tile_size)) return;
        this.collidePlatformLeft(tile_x); break;
      
      case 2: // ladder with no collision, but with a climbing mechanic that makes the y velocity increase to counter gravity, letting the player climb upwards
        if (controller.up) 
        {
          this.y_velocity -= 0.7;
          this.jumping = true;
        }
        break;
      
      case 3: // object that has no collision on the bottom, allowing for entry by ladder
        if (this.collidePlatformTop(tile_y)) return; 
        if (this.collidePlatformRight(tile_x + tile_size)) return;
        this.collidePlatformLeft(tile_x); break;
    }
  }
  collidePlatformBottom(tile_bottom) {
    if (this.getTop() < tile_bottom && this.getOldTop() >= tile_bottom) {
      this.setTop(tile_bottom);
      this.y_velocity = 0;     
      return true;               
    } 
    return false;              
  }
  collidePlatformLeft(tile_left) {
    if (this.getRight() > tile_left && this.getOldRight() <= tile_left) {
      this.setRight(tile_left);
      this.x_velocity = 0; 
      return true;
    } 
    return false;
  }
  collidePlatformRight(tile_right) {
    if (this.getLeft() < tile_right && this.getOldLeft() >= tile_right) {
      this.setLeft(tile_right);
      this.x_velocity = 0; 
      return true;
    } 
    return false;
  }
  collidePlatformTop(tile_top) {
    if (this.getBottom() > tile_top && this.getOldBottom() <= tile_top) {
      this.setBottom(tile_top - 0.5); // 0.5 because of a rounding issue
      this.y_velocity = 0; 
      this.jumping = false;
      return true;
    } 
    return false;
  }
  collideObject() {
    var bottom, left, right, top, value, sprite_size;
    sprite_size = tile_sheet.tile_size*4;
    
    top = Math.floor(this.getTop() / (sprite_size)); // First we test the top left corner of the player.
    left = Math.floor(this.getLeft() / (sprite_size));
    value = world.collision[top * world.columns + left];
    this.collide(value, left * (sprite_size), top * (sprite_size), sprite_size);
  
    // We redifine top from the last collision check because the player may have moved. 
    top = Math.floor(this.getTop() / (sprite_size));
    right = Math.floor(this.getRight() / (sprite_size));
    value = world.collision[top * world.columns + right];
    this.collide(value, right * (sprite_size), top * (sprite_size), sprite_size);
  
    bottom = Math.floor(this.getBottom() / (sprite_size));
    left = Math.floor(this.getLeft() / (sprite_size));
    value = world.collision[bottom * world.columns + left];
    this.collide(value, left * (sprite_size), bottom * (sprite_size), sprite_size);
  
    bottom = Math.floor(this.getBottom() / (sprite_size));
    right = Math.floor(this.getRight() / (sprite_size));
    value = world.collision[bottom * world.columns + right];
    this.collide(value, right * (sprite_size), bottom * (sprite_size), sprite_size);
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
}
  
  export default class player {};