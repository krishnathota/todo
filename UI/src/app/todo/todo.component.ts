import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @ViewChild('todoInput', { read: ElementRef }) todoInput!: ElementRef;

  newTodo: string = '';
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private configService: ConfigService,
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  addTodo(): void {
    const task = this.todoInput.nativeElement.value;

    if (!task.trim()) {
      return;
    }

    const todo: Todo = {
      _id: Date.now().toString(), // Generate a unique ID (you can use a proper ID generator)
      task,
      completed: false,
    };

    this.todoService.addTodo(todo).subscribe((todo) => {
      this.todos.push(todo);
      this.todoInput.nativeElement.value = '';
    });
  }

  deleteTodo(id?: string): void {
    if (id) {
      this.todoService.deleteTodo(id).subscribe((_) => {
        this.todos = this.todos.filter((_) => _._id !== id);
        this.snackBar.open(
          'Deleted todo',
          undefined,
          this.configService.config.snackBarConfig,
        );
      });
    }
  }
}
