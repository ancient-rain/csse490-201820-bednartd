import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-widget',
  templateUrl: './comment-widget.component.html',
  styleUrls: ['./comment-widget.component.css']
})
export class CommentWidgetComponent implements OnInit {
  private listId = 'COMMENT_COMPONENET_LIST';
  private editId = 'COMMENT_COMPONENT_EDIT';

  constructor() { }

  ngOnInit() {
  }

}
