import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'filterStatus',
  pure: false,
})
export class FilterStatusPipe implements PipeTransform {
  transform(items: Todo[], value: boolean): Todo[] {
    return items.filter((_) => _.completed === value);
  }
}
