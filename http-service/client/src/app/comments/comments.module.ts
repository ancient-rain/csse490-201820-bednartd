import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../services/comment.service';
import { FormsModule } from '@angular/forms';
import { CommentWidgetComponent } from './comment-widget.component';
import { CommentListComponent } from './comment-list.component';
import { CommentBoxComponent } from './comment-box.component';
import { CommentFormComponent } from './comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CommentWidgetComponent,
    CommentListComponent,
    CommentBoxComponent,
    CommentFormComponent
  ],
  providers: [
    CommentService
  ],
  exports: [
    CommentWidgetComponent,
    CommentListComponent,
    CommentBoxComponent,
    CommentFormComponent
  ]
})
export class CommentsModule { }
