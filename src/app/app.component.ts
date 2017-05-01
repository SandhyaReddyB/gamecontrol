import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nums: number[] = [];
  onGameStart(number) {
    this.nums.push(number);
    console.log(number);
    //this.num=number;
  }
}
