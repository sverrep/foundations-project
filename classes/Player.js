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
    this.animation = new Animation();
    this.isMovingRight = true; 
  }
  isMoving() {
    if (controller.left) {
      if (!this.jumping) {
        this.animation.change(tile_sheet.frame_sets[3], 10); // running animation to the left
      }
      this.x_velocity -= 0.5;
      this.isMovingRight = false;
    }
    if (controller.right) {
      if (!this.jumping) {
        this.animation.change(tile_sheet.frame_sets[1], 10); // running animation to the right
      }
      this.x_velocity += 0.5;
      this.isMovingRight = true;
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
    } 
  }
  isFallingOutOfBounds(height) {
    if (this.y > height - 64) { // if player is falling below floor line
      this.jumping = false;
      this.y_velocity = 0;
      this.x = world.start[0];
      this.y = world.start[1];
      this.isMovingRight = true;
    }
  }
  isMovingOutOfBounds(width) {
    if (this.x < -60) { // if player is going off the left of the screen
      this.x = width;
    } 
    else if (this.x > width) { // if player goes past right boundary
      this.x = -60;
    }
  }
  update() {
    this.x_old = this.x;
    this.y_old = this.y;
    this.y_velocity += 0.6;// gravity
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.x_velocity *= 0.9;// friction
    this.y_velocity *= 0.9;// friction
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