import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() gameStarted = new EventEmitter<number>();
  interval;
  count: number =1;
  constructor() {}
  ngOnInit() {}
  
  onStart() {
   this.interval=setInterval(()=> {
     this.gameStarted.emit(this.count++);
   },1000)
  }
  onStop() {
    clearInterval(this.interval);
  }
}
