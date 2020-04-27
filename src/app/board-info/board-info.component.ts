import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board, BoardService, Pin} from '../services/board.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-board-info',
  templateUrl: './board-info.component.html',
  styleUrls: ['./board-info.component.css']
})
export class BoardInfoComponent implements OnInit {

  @Input()
  board: Board;
  @Output() updateBoard = new EventEmitter<Board>();


  boardTotal = 0;
  boardMarketplaces = [];
  updating =  false;


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    console.log(this.availableTags);
    // this.boardTotal = this.board.pins.reduce((total, currentPin) => total + currentPin.price, 0);
    // this.boardMarketplaces = this.board.pins.filter((pin) => pin.marketplace )
  }

  updateBoardPins() {
    this.updating = true;
    this.boardService.updateBoard(this.board.id).toPromise()
      .then(response => {
        this.updating = false;
        return this.updateBoard.emit(response.data);
      });
  }

  calculateTotal(): number {
    return this.board.pins.reduce((total, currentPin) => total + currentPin.price, 0);
  }

  showMarketplaces() {
   return  Array.from(new Set(this.board.pins.map(pin => pin.marketplace))).join(', ');
  }

  public get availableTags() {
    let tags = [];
    for (let pin of this.board.pins) {
      tags = tags.concat(pin.tags);

    }

    return [...new Set(tags)];
  }

}
