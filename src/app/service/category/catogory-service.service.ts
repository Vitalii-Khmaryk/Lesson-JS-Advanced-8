import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CatogoryServiceService {
  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories);
  }

  create(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.categories, category);
  }

  update(
    category: ICategoryRequest,
    id: number
  ): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(
      `${this.api.categories}/${id}`,
      category
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}

export interface ICategoryRequest {
  name: string;
  path: string;
  imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequest {
  id: number;
}
