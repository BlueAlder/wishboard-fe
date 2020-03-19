import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {formatNumber} from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  createBoard(name: string) {
    const body = new HttpParams()
      .set('name', name);

    return this.http.post<ApiResponse<Board>>(`${environment.api_url}/api/board`, body);
  }

  getBoard(id: number) {
    return this.http.get<ApiResponse<Board>>(`${environment.api_url}/api/board/${id}`);
  }

  createPin(url: string, boardId: number) {
    const body = new HttpParams()
      .set('url', url)
      .set('board', boardId.toString());
    return this.http.post<ApiResponse<Pin>>(`${environment.api_url}/api/pin`, body);

  }
}

export interface Board {
  id: number;
  name: string;
  pins: Pin[];
}

export interface Pin {
  prod_url: string;
  title: string;
  price: number;
  img: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
