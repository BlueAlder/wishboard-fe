import { Component, OnInit } from '@angular/core';
import {Board, BoardService} from '../services/board.service';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;
  loading = false;
  newPinUrl = '';

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      console.log(params);
      this.getBoardData(parseInt(params.id, 10));
    });

  }

  async getBoardData(id: number) {
    this.loading = true;
    console.log(id);
    // Get the data from the board
    const response = await this.boardService.getBoard(id).toPromise();

    // assuming all goes well and save to local storage
    this.board = response.data;
    this.localStorageService.addToViewedBoards(this.board.id);
    this.loading = false;
  }

  async addNewPin(url: string) {
    this.loading = true;
    const response = await this.boardService.createPin(url, this.board.id).toPromise();
    this.getBoardData(this.board.id);
  }

  calculateBoardPriceTotal() {
    return this.board.pins.reduce((total, pin) => total += pin.price, 0);
  }

  removePin(pinId: number) {

    this.board.pins = this.board.pins.filter(pin => pin.id !== pinId);
  }
}
