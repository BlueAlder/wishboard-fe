import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {formatNumber} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  createBoard(name: string) {
    const body = new HttpParams()
      .set('name', name);

    return this.http.post<ApiResponse<Board>>('/api/board', body);
  }

  getBoard(id: number) {
    return this.http.get<ApiResponse<Board>>(`/api/board/${id}`);
  }

  createPin(url: string, boardId: number) {
    const body = new HttpParams()
      .set('url', url)
      .set('board', boardId.toString());
    return this.http.post<ApiResponse<Pin>>('/api/pin', body);

  }
}

export interface Board {
  id: number;
  name: string;
  pins: Pin[];
}

export interface Pin {
  title: string;
  price: string;
  img: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
