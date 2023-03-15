import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ActionServiceService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<IActionResponse[]> {
    return this.http.get<IActionResponse[]>(this.api.actions);
  }

  create(action: IActionRequest): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(this.api.actions, action);
  }

  update(action: IActionRequest, id: number): Observable<IActionResponse> {
    return this.http.patch<IActionResponse>(
      `${this.api.actions}/${id}`,
      action
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }
}

export interface IActionRequest {
  date: Date;
  name: string;
  title: string;
  description: string;
  imagePath: string;
}

export interface IActionResponse extends IActionRequest {
  id: number;
}
