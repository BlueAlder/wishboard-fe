import {Component, Input, OnInit} from '@angular/core';
import {Pin} from '../services/board.service';

@Component({
  selector: 'app-pin-tags',
  templateUrl: './pin-tags.component.html',
  styleUrls: ['./pin-tags.component.css']
})
export class PinTagsComponent implements OnInit {

  @Input()
  pin: Pin;

  constructor() { }

  ngOnInit(): void {
  }

}
