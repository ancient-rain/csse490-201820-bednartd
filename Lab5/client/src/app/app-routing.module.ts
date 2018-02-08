import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateScheduleComponent } from './generate-schedule/generate-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';

const routes: Routes = [
    { path: '', component: GenerateScheduleComponent },
    { path: 'session', component: ViewScheduleComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
