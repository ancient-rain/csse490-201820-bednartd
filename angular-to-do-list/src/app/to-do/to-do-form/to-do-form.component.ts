import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/to-do.model';
import { ToDoService } from '../../services/to-do.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {

  formGroup: FormGroup;
  title: string;
  editing: boolean;
  todoId: number;

  constructor(
    private todoService: ToDoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.formGroup = fb.group({
      'id': '',
      'name': ['', Validators.required],
      'due': '',
      'done': '',
      'notes': ''});
      this.editing = false;
  }

  ngOnInit() {
    this.todoId = parseInt(this.route.snapshot.params['id'], 10);
    this.editing = this.todoId ? true : false;
    if (this.editing) {
      this.showEditForm();
    } else {
      this.title = 'New Todo Item';
    }
  }

  saveTodo(todo: Todo) {
    if (todo.id) {
      this.todoService.updateTodo(todo);
    } else {
      this.todoService.addTodo(todo);
    }
    this.navigateToList();
  }

  showEditForm() {
    this.title = 'Edit Todo Item';
    const todo = this.todoService.getTodo(this.todoId);
    if (!todo) {
      return;
    }
    const editedTodo = Object.assign({}, todo, { due: this.applyLocale(todo.due) });
    this.formGroup.setValue(editedTodo);
  }

  navigateToList() {
    this.router.navigateByUrl('/todos');
  }

  cancelEditTodo() {
    this.formGroup.reset();
    this.todoId = null;
    this.editing = false;
  }


  removeToDo() {
    const todo = this.todoService.getTodo(this.todoId);
    if (!todo) {
      return;
    }
    this.todoService.deleteTodo(todo);
    this.navigateToList();
  }

  applyLocale(due) {
    return new DatePipe(navigator.language).transform(due, 'y-MM-dd');
  }

}
