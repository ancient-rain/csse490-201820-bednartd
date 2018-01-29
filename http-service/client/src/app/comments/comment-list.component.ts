import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges {
  comments: Comment[];
  @Input() listId: string;
  @Input() editId: string;

  constructor(private commentService: CommentService) { }

  loadComments() {
    this.commentService.getComments()
      .subscribe(comments =>
        this.comments = comments,
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.loadComments();
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.listId)
    .subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

}
