import { Component, OnInit } from '@angular/core';
import {Board, BoardService, Pin} from '../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {NotificationService} from '../services/notification.service';
import {error} from 'selenium-webdriver';

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
              private localStorageService: LocalStorageService,
              private notificationService: NotificationService,
              private router: Router) {
  }

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
    const response = await this.boardService.getBoard(id).toPromise()
      .catch(err => {
        console.error(err);
        if (err.status === 400) {
          console.log('Cannot find board :(');
          this.notificationService.showError('Cannot find da board sorry :(');
          this.router.navigate(['']);
        }
      });

    // assuming all goes well and save to local storage
    if (response) {
      this.board = response.data;
      this.localStorageService.addToViewedBoards(this.board);
      this.loading = false;
    }

  }

  async addNewPin(url: string) {
    this.loading = true;
    const response = await this.boardService.createPin(url, this.board.id).toPromise()
      .catch(err => {
        if (err.status === 400) {
          console.error(err.error.message);
          if (typeof (err.error.message) === 'string') {
            this.notificationService.showError(err.error.message);
          } else {
            this.notificationService.showError('something went wrong uh oh');
          }
        } else {
          this.notificationService.showError('An error occured and it was your fault');
          this.loading = false;
          throw new Error('AAAAAAAAAAAAAAAAAAAAAA');
        }
      });
    this.getBoardData(this.board.id);
  }

  calculateBoardPriceTotal() {
    return this.board.pins.reduce((total, pin) => total += pin.price, 0);
  }

  async deletePin(pinToDelete: Pin) {
    this.board.pins = this.board.pins.filter(pin => pin.id !== pinToDelete.id);
  }
}
