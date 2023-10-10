import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todosUrl!: string;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient,
  ) {
    this.todosUrl = new URL(
      `${this.config.config.serviceUrl}${this.config.config.todos}`,
    ).toString();
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo);
  }

  deleteTodo(id: string) {
    const url = new URL(`${this.todosUrl}/${id}`).toString();
    return this.http.delete(url);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    const url = new URL(`${this.todosUrl}/${id}`).toString();
    return this.http.put<Todo>(url, todo);
  }
}
