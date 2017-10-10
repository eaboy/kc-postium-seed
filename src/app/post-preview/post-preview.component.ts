import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {

  @Input() post: Post;

  @Output() postClicked  = new EventEmitter<Post>(); // Green Path
  @Output() authorClicked  = new EventEmitter<Post>(); // Red Path

  notifyPostClicked(post: Post): void { // Green Path
    this.postClicked.emit(post);
  }
  
  notifyAuthorClicked(post: Post): void { // Red Path
    this.authorClicked.emit(post);
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

}
