import { Animation } from "/classes/Animation.js";

export class Player { // creating a class for the player object
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
  

  export default class player {};