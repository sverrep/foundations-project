export class Animation { // class for sprite animations
  
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

  updateAnimation(){
    this.count ++; // how many cycles have passed since last update
      if (this.count >= this.delay){ // if enough cycles have passed change frame
        this.count = 0; // reset counter
        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1; // if the frame index is on the last value of the frame set, reset to 0. If the frame index is not on the last value just add 1 to it.
        this.frame = this.frame_set[this.frame_index]; // change current frame value
      }
  }
}