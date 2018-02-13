import { Injectable } from '@angular/core';
import { Todo } from '../models/to-do.model';
import { TODO_ITEMS } from '../../api/to-do-data';

@Injectable()
export class ToDoService {
  pItems: Todo[] = TODO_ITEMS;
  private nextId = this.pItems.length + 1;

  constructor() { }

  getTodosFromData(): Todo[] {
    return this.pItems;
  }
  getTodo(id: number): Todo {
    // DONE: Implement this method.
    for (let i = 0; i < this.pItems.length; i++) {
      const item = this.pItems[i];
      if (item.id === id) {
        return item;
      }
    }
    return  null;
  }
  addTodo(todo: Todo) {
    // DONE: Implement this method.
    todo.id = this.nextId;
    this.pItems.push(todo);
    this.nextId++;
  }
  updateTodo(todo: Todo) {
    // DONE: Implement this method.
    for (let i = 0; i < this.pItems.length; i++) {
      const item = this.pItems[i];
      if (item.id === todo.id) {
        item.name = todo.name;
        item.notes = todo.notes;
        item.due = todo.due;
        item.done = todo.done;
      }
    }
  }

  deleteTodo(todo: Todo) {
    // DONE: Implement this method.
    for (let i = 0; i < this.pItems.length; i++) {
      const item = this.pItems[i];
      if (item.id === todo.id) {
        this.pItems.splice(i, 1);
      }
    }
  }

}
