import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  updateBoard(id: number) {
    const body = {
      boardId: id
    };
    return this.http.post<ApiResponse<Board>>(`${environment.api_url}/api/board/update`, body);
  }

  createPin(url: string, boardId: number) {
    const body = {
      url,
      boardId
    };
    return this.http.post<ApiResponse<Pin>>(`${environment.api_url}/api/pin`, body);
  }

  // tslint:disable-next-line:variable-name
  deletePin(_id: number, _boardId: number) {
    const body = {
      id: _id,
      boardId: _boardId,
    };
    // console.log(body);
    return this.http.request('delete', `${environment.api_url}/api/pin`, {body});
  }
}

export interface Board {
  id: number;
  name: string;
  lastUpdated: string;
  pins: Pin[];
}

export interface Pin {
  id: number;
  boardId: number;
  prodUrl: string;
  title: string;
  price: number;
  img: string;
  marketplace: string;
  tags: string[];
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
