import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/to-do.model';
import { ToDoService } from '../../services/to-do.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  todos: Todo[];
  displayedColumns = ['name', 'due', 'notes', 'done', 'action'];
  constructor(private todoService: ToDoService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.todos = this.todoService.getTodosFromData();
  }

  editToDo(todo: Todo) {
    this.router.navigate(['/todo-form', todo.id]);
  }
}
