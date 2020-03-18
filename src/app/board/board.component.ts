import { Component, OnInit } from '@angular/core';
import {Board, BoardService} from '../services/board.service';
import {ActivatedRoute} from '@angular/router';

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
              private route: ActivatedRoute) { }

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
    const response = await this.boardService.getBoard(id).toPromise();
    this.board = response.data;
    console.log(response);
    this.loading = false;
  }

  async addNewPin(url: string) {
    this.loading = true;
    const response = await this.boardService.createPin(url, this.board.id).toPromise();
    this.getBoardData(this.board.id);
  }
}
