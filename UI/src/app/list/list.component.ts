import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Todo } from '../models/todo.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoService } from '../services/todo.service';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() todos: Todo[] = [];
  @Input() isCompleted = false;

  @Output() delete$ = new EventEmitter<string>();

  // @Output() statusChange$: EventEmitter<{ id:number, value:boolean }>();
  constructor(
    private readonly todoService: TodoService,
    private readonly configService: ConfigService,
    private readonly snackBar: MatSnackBar,
  ) {}

  statusChange($event: MatCheckboxChange, todo: Todo): void {
    todo.completed = $event.checked;
    if (todo._id) {
      this.todoService.updateTodo(todo._id, todo).subscribe((_: Todo) => {
        this.snackBar.open(
          _.completed ? 'Todo Completed !!!' : 'Updated todo',
          undefined,
          this.configService.config.snackBarConfig,
        );
      });
    }
  }

  deleteTodo(id?: string) {
    if (id) this.delete$.emit(id);
  }

  listItemDropped($event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, $event.previousIndex, $event.currentIndex);
    console.log('Dropped', $event);
  }
}
