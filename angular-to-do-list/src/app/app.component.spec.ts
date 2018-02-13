import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from './material/material.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        NavBarComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular To Do List'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular To Do List');
  }));

  it('should pass app title to navBar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const nodeAttributes = compiled
      .querySelector('app-nav-bar').attributes as NamedNodeMap;
    // ng-reflect- prepends attribute because of Angular data binding
    expect(nodeAttributes.getNamedItem('ng-reflect-title').value)
      .toEqual(app.title);
  }));

  it('should contain a router-outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // Hint:  CSS selectors are listed at
    // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    expect(compiled.querySelector('div > router-outlet'))
      .toBeTruthy();
  }));

});
