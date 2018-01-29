import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { EmitterService } from '../services/emitter.service';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnChanges {
  private model = new Comment(new Date(), '', '');
  private editing = false;

  @Input() listId: string;
  @Input() editId: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  submitComment() {
    // Variable to hold a reference of addComment/updateComment Observable
    let commentOperation: Observable<Comment[]>;

    if (!this.editing) {
        // Create a new comment
        commentOperation = this.commentService.addComment(this.model);
    } else {
        // Update an existing comment
         commentOperation = this.commentService.updateComment(this.model);
    }

    // Subscribe to observable
    commentOperation
    .subscribe(
        comments => {
            // Emit list event
            EmitterService.get(this.listId).emit(comments);
            // Empty model
            this.model = new Comment(new Date(), '', '');
            // Switch editing status
            if (this.editing) {
                this.editing = !this.editing;
            }
        },
        err => {
            // Log errors if any
            console.log(err);
        });
    }


  ngOnChanges() {
    EmitterService.get(this.editId).subscribe((comment: Comment) => {
      this.model = comment;
      this.editing = true;
    });
  }
}
