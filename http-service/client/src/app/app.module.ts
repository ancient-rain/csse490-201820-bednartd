import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommentsModule } from './comments/comments.module';
import { EmitterService } from './services/emitter.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommentsModule
  ],
  providers: [
    EmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
