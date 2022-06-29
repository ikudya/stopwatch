import { fromEvent } from 'rxjs';
import { map, buffer, filter, debounceTime } from 'rxjs/operators';
import {Component} from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'stopwatch';
  sec: any = '0' + 0;
  min: any = '0' + 0;
  startTimer: any;
  running = false;

  click$ = fromEvent(document, 'click');
  doubleClick$ = this.click$
    .pipe(
      buffer(this.click$.pipe(debounceTime(500))),
      map(clicks => clicks.length),
      filter(clicksLength => clicksLength >= 2)
    );


  start(): void{
    if (this.running != true) {
      this.startTimer = setInterval(()=>{
        this.running = true;
        this.sec++
        this.sec = this.sec < 10 ? '0' + this.sec : this.sec;

        if(this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
         if(this.min === 60) {
         this.stop();
         alert('One hour has passed ')
         }
        }
      }, 1000)
    }
    }
  stop(): void {
    this.running = false;
    clearInterval(this.startTimer);
    this.min = this.sec = '0' + 0;
  }
  reset():void {
    if (this.running == true)
    {
      this.running = false;
      clearInterval(this.startTimer);
      this.min = this.sec = '0' + 0;
      this.start();
    } else {alert('To get started, start the stopwatch!')}

  }

  wait():void{
    this.doubleClick$.subscribe(_ => {
      this.running = false;
      clearInterval(this.startTimer);
    });
  }
}
