import {Component, Input, OnInit} from '@angular/core';
import {Pin} from '../services/board.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() pin: Pin;

  constructor() { }

  ngOnInit(): void {
    console.log(this.pin);
  }

  openLink(prodUrl: string) {
    window.open(prodUrl, '_blank');
  }
}
