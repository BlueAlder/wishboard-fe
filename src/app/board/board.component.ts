import { Component, OnInit, Inject } from '@angular/core';
import {ApiResponse, Board, BoardService, Pin} from '../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {NotificationService} from '../services/notification.service';
import {error} from 'selenium-webdriver';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;
  loading = false;
  newPinUrl = '';
  addingPin = false;
  searchQuery = '';

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private notificationService: NotificationService,
              private router: Router,
              public dialog: MatDialog
              ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      // console.log(params);
      this.getBoardData(parseInt(params.id, 10));
    });


 }

  async getBoardData(id: number) {
    this.loading = true;
    // console.log(id);
    // Get the data from the board
    const response = await this.boardService.getBoard(id).toPromise()
      .catch(err => {
        console.error(err);
        if (err.status === 400) {
          // console.log('Cannot find board :(');
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
    // this.loading = true;
    this.addingPin = true;
    this.boardService.createPin(url, this.board.id).toPromise()
      .then((response) => {
        this.addingPin = false;
        console.log(response.data);
        this.board.pins.push(response.data);
      })
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
          this.addingPin = false;
          throw new Error('AAAAAAAAAAAAAAAAAAAAAA');
        }
        return;
      });
    // this.getBoardData(this.board.id);
  }

  calculateBoardPriceTotal() {
    return this.board.pins.reduce((total, pin) => total += pin.price, 0);
  }

  public get supported_marketplaces() {
    return environment.supported_marketplaces;
  }

  async deletePin(pinToDelete: Pin) {
    // console.log(pinToDelete);
    this.board.pins = this.board.pins.filter(pin => pin.id !== pinToDelete.id);
  }

  updateBoard(updateBoard: Board) {
    this.board = updateBoard;
  }

  drop($event: CdkDragDrop<Pin[]>) {
      moveItemInArray(this.board.pins, $event.previousIndex, $event.currentIndex);
  }

  openPinDialog() {
    const dialogRef =  this.dialog.open(AddPinDialogComponent, {
      width: '800px',
      height: '150px',
      data: {url: 'sadasd'}
    });

    dialogRef.afterClosed().subscribe(result => {
       // console.log('The dialog was close');
      if (result) {
        this.addNewPin(result);
      }
    });
  }
}

export interface DialogData {
  newPinUrl: string;
}

@Component({
  selector: 'app-add-pin-dialog',
  templateUrl: 'add-pin-dialog.html',
  styleUrls: ['./board.component.css']
})
export class AddPinDialogComponent {
  newPinUrl = '';
  constructor(
    public dialogRef: MatDialogRef<AddPinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel() {
    this.data.newPinUrl = '';
    this.dialogRef.close();
  }
}
