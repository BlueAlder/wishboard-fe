import { Component, OnInit } from '@angular/core';
import {BoardService} from '../services/board.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visitedBoards = [];
  constructor(private boardService: BoardService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  boardName = '';
  loading = false;

  ngOnInit(): void {
    this.visitedBoards = this.localStorageService.getViewedBoards();
  }

  async createNewBoard(name) {
    this.loading = true;
    const boardResponse = await this.boardService.createBoard(name).toPromise();
    // console.log(boardResponse);
    this.router.navigate([`/board/${boardResponse.data.id}`]);
  }

}
