import { Component, OnInit } from '@angular/core';
import {BoardService} from '../services/board.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private boardService: BoardService,
              private router: Router) { }

  boardName = '';

  ngOnInit(): void {
  }

  async createNewBoard(name) {
    const boardResponse = await this.boardService.createBoard(name).toPromise();
    console.log(boardResponse);
    this.router.navigate([`/boards/${boardResponse.data.id}`]);


  }

}
