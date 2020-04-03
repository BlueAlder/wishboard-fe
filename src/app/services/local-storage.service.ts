import { Injectable } from '@angular/core';
import {Board} from './board.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  boardSaveName = 'boards';

  constructor() { }

  getViewedBoards() {
    const boards = localStorage.getItem(this.boardSaveName);
    if (boards === null) {
      return [];
    } else {
      return JSON.parse(boards);
    }

  }
  // TODO add functionality for when the localstorage is malformed
  addToViewedBoards(visitedBoard: Board) {
    const storedBoards = localStorage.getItem(this.boardSaveName);
    if (storedBoards === null) {
      const boards = JSON.stringify([{id: visitedBoard.id, name: visitedBoard.name}]);
      localStorage.setItem(this.boardSaveName, boards);
    } else {
      const boards = JSON.parse(storedBoards);
      console.log(board => board);
      if (!boards.some(board => board.id === visitedBoard.id)) {
        boards.push({id: visitedBoard.id, name: visitedBoard.name});
        localStorage.setItem(this.boardSaveName, JSON.stringify(boards));

      }
    }

  }
}
