import { Injectable } from '@angular/core';
import { Todo } from '../models/to-do.model';
import { TODO_ITEMS } from '../../api/to-do-data';

@Injectable()
export class ToDoService {
  pItems: Todo[] = TODO_ITEMS;

  constructor() { }

  getTodosFromData(): Todo[] {
    return this.pItems;
  }
  getTodo(id: number): Todo {
    // TODO: Implement this method.
    return  null;
  }
  addTodo(todo: Todo) {
    // TODO: Implement this method.
  }
  updateTodo(todo: Todo) {
    // TODO: Implement this method.
  }
  deleteTodo(todo: Todo) {
    // TODO: Implement this method.
  }

}
