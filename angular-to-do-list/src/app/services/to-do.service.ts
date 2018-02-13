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
    // for (let i = 0; i < this.pItems.length; i++) {
    //   const item = this.pItems[i];
    //   if (item.id === id) {
    //     return item;
    //   }
    // }
    return  null;
  }
  addTodo(todo: Todo) {
    // TODO: Implement this method.
    this.pItems.push(todo);
  }
  updateTodo(todo: Todo) {
    // TODO: Implement this method.
  }
  deleteTodo(todo: Todo) {
    // TODO: Implement this method.
  }

}
