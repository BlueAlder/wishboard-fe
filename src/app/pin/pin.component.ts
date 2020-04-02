import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardService, Pin} from '../services/board.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() pin: Pin;
  @Output() deleted = new EventEmitter<number>();

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    console.log(this.pin);
  }

  openLink(prodUrl: string) {
    console.log('hi');
    window.open(prodUrl, '_blank');
  }

  async deletePin() {
    console.log('hi');
    // await this.boardService.deletePin(this.pin.id, this.pin.boardId).toPromise();
    this.deleted.emit(this.pin.id);
  }
}
