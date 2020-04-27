import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardService, Pin} from '../services/board.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() pin: Pin;
  @Input() isSkeleton = false;
  @Output() delete = new EventEmitter<Pin>();

  isDeleting = false;


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    // console.log(this.pin);
  }

  openLink(prodUrl: string) {
    // console.log('hi');
    window.open(prodUrl, '_blank');
  }

  async deletePin() {
    // console.log(this.pin);
    this.isDeleting = true;
    await this.boardService.deletePin(this.pin.id, this.pin.boardId).toPromise()
      .catch(err => {
        this.isDeleting = false;
        throw Error('Bruh');

      });
    this.delete.emit(this.pin);
  }
}
