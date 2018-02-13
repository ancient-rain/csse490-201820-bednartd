import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ToDoFormComponent } from './to-do-form.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoService } from '../../services/to-do.service';
import { MockToDoService } from '../../services/mock-to-do.service.mock';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from '../../app-routing.module';
import { ToDoListComponent } from '..';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

/*
 * This is a mock for the ActivatedRoute class.
 * The route params for the active route are stored
 * in the snapshot property of the ActivatedRoute instance.
*/
class MockActivatedRoute {
  snapshot = {
    params: { id: 1 },
  };
}

describe('ToDoFormComponent', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      declarations: [
        ToDoFormComponent,
        ToDoListComponent,
      ],
      providers: [
        // This class only has spies to spy on methods.
        { provide: ToDoService, useClass: MockToDoService },
        { // This class exists only mocks the params['id'] value
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create',
    inject([ToDoService, Router],
      (service: ToDoService, router: Router) => {
        expect(component).toBeTruthy();
      }
    ));

  it('should be able to create a New Todo Item form',
    fakeAsync(inject([ToDoService, Router, ActivatedRoute],
      (service: ToDoService, router: Router,
        route: ActivatedRoute) => {
        // details for the current route injected here.
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {}; // pass empty object for params
        fixture.detectChanges(); // triggers ngOnInit() in component

        // DONE: write expectations for the values of editing, todoId, and title
        // values of the ToDoFormComponent instance.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note below.
        expect(component.editing).toBeFalsy();
        expect(component.title).toBe('New Todo Item');
        expect(component.todoId).toBeNaN();
      })
    ));

  it('form should be invalid when empty',
    fakeAsync(inject([ToDoService, Router, ActivatedRoute],
      (service: ToDoService, router: Router,
        route: ActivatedRoute) => {
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {};
        fixture.detectChanges();

        // DONE: write your missing test code here.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note below.
        expect(component.formGroup.controls['id'].value).toBe('');
        expect(component.formGroup.controls['name'].value).toBe('');
        expect(component.formGroup.controls['due'].value).toBe('');
        expect(component.formGroup.controls['done'].value).toBe('');
        expect(component.formGroup.controls['notes'].value).toBe('');
      })
    ));

  it('form name/todo field should be invalid when empty',
    fakeAsync(inject([ToDoService, Router, ActivatedRoute],
      (service: ToDoService, router: Router,
        route: ActivatedRoute) => {
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {};
        fixture.detectChanges();

        // DONE: write your missing test code here.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note below.
        expect(component.formGroup.controls['name'].value).toBe('');
        expect(component.formGroup.valid).toBeFalsy();
      })
    ));

  it('form name/todo field should yield required error when empty',
    fakeAsync(inject([ToDoService, Router, ActivatedRoute],
      (service: ToDoService, router: Router,
        route: ActivatedRoute) => {
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {};
        fixture.detectChanges();
        const todo = component.formGroup.controls['name'];
        const errors = todo.errors || {};
        expect(errors['required']).toBeTruthy();
      })
    ));

  /*  THIS IS A NICE EXAMPLE TO START FROM! */
  it('should navigate to ToDoListComponent after saving a Todo item',
    fakeAsync(inject([ToDoService, Router, Location, ActivatedRoute],
      (service: ToDoService, router: Router, location: Location,
        route: ActivatedRoute) => {
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {};
        fixture.detectChanges();
        expect(component.formGroup.valid).toBeFalsy();
        component.formGroup.controls['name'].setValue('Call my friend Bob');
        component.formGroup.controls['notes'].setValue('Note to self');
        expect(component.formGroup.valid).toBeTruthy();

        const spy = spyOn(component, 'navigateToList').and.callThrough();
        component.saveTodo(component.formGroup.value);

        tick(); // Simulate the passing of time for saveTodo to complete
        expect(component.navigateToList).toHaveBeenCalled();
        expect(location.path()).toBe('/todos');
      })
    ));

  it('should call ToDoService.addTodo() when adding a new Todo item',
    fakeAsync(inject([ToDoService, Router, Location, ActivatedRoute],
      (service: ToDoService, router: Router, location: Location,
        route: ActivatedRoute) => {
        const currentRoute = fixture.debugElement.injector.get(ActivatedRoute);
        currentRoute.snapshot.params = {};
        fixture.detectChanges();
        expect(component.formGroup.valid).toBeFalsy();
        component.formGroup.controls['name'].setValue('Call my friend Bob');
        component.formGroup.controls['notes'].setValue('Note to self');
        expect(component.formGroup.valid).toBeTruthy();

        component.saveTodo(component.formGroup.value);

        tick(); // Simulate the passing of time for saveTodo to complete

        // DONE: write your missing test code here.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note above.
        // Write 1 to 2 expectations.
        expect(service.addTodo).toHaveBeenCalled();
        expect(location.path()).toBe('/todos');
      })
    ));

  it('should call ToDoService.updateTodo() when updating a new Todo item',
    fakeAsync(inject([ToDoService, Router, Location, ActivatedRoute],
      (service: ToDoService, router: Router, location: Location,
        route: ActivatedRoute) => {
        fixture.detectChanges();
        component.formGroup.controls['name'].setValue('Call my friend Bob');
        expect(component.formGroup.valid).toBeTruthy();
        component.formGroup.controls['notes'].setValue('Note to self');
        const todoItem = component.formGroup.value;
        todoItem.id = component.todoId;
        component.saveTodo(todoItem);

        tick(); // Simulate the passing of time for saveTodo to complete

        // DONE: write your missing test code here.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note above.
        // Write 1 to 2 expectations.
        expect(service.updateTodo).toHaveBeenCalled();
      })
    ));

  it('should be able to create an Edit Todo Item form',
    fakeAsync(inject([ToDoService, Router],
      (service: ToDoService, router: Router) => {
        fixture.detectChanges();

        // DONE: write expectations for the values of editing, todoId, and title
        // values of the ToDoFormComponent instance.
        // See the THIS IS A NICE EXAMPLE TO START FROM! note above.
        expect(component.editing).toBeTruthy();
        expect(component.todoId).toBe(1);
        expect(component.title).toBe('Edit Todo Item');
      })));


  it('form should be invalid when reset with cancelEditTodo()',
    fakeAsync(inject([ToDoService, Router],
      (service: ToDoService, router: Router) => {
        fixture.detectChanges();
        component.formGroup.controls['name'].setValue('Call my friend Bob');
        expect(component.formGroup.valid).toBeTruthy();

        component.cancelEditTodo();

        expect(component.formGroup.valid).toBeFalsy();
      })));

});
