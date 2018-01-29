import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() comment: Comment;
  @Input() listId: string;
  @Input() editId: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  deleteComment(id: string) {
    this.commentService.removeComment(id)
      .subscribe(comments => {
        EmitterService.get(this.listId).emit(comments);
      },
      err => {
        console.log(err);
      }
    );
  }

  editComment() {
    EmitterService.get(this.editId)
    .emit(this.comment);
  }

}
