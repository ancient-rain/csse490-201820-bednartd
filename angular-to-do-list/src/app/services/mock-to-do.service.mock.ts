import { ToDoService } from './to-do.service';
import Spy = jasmine.Spy;

export class MockToDoService extends ToDoService{
  getTodosFromDataSpy: Spy;
  getTodoSpy: Spy;
  addTodoSpy: Spy;
  updateTodoSpy: Spy;
  deleteTodoSpy: Spy;

  constructor() {
    super();

    this.getTodosFromDataSpy = spyOn(this, 'getTodosFromData');
    this.getTodoSpy = spyOn(this, 'getTodo');
    this.addTodoSpy = spyOn(this, 'addTodo');
    this.updateTodoSpy = spyOn(this, 'updateTodo');
    this.deleteTodoSpy = spyOn(this, 'deleteTodo');
  }

}
