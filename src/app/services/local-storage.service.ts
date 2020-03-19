import { Injectable } from '@angular/core';

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
  addToViewedBoards(boardId: number) {
    const storedBoards = localStorage.getItem(this.boardSaveName);
    if (storedBoards === null) {
      const boards = JSON.stringify([boardId]);
      localStorage.setItem(this.boardSaveName, boards);
    } else {
      const boards = JSON.parse(storedBoards);
      console.log(boards);
      if (!boards.includes(boardId)) {
        boards.push(boardId);
        localStorage.setItem(this.boardSaveName, JSON.stringify(boards));

      }
    }

  }
}
