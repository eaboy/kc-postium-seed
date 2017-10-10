import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Post } from '../post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent {

  @Input() posts: Post[];

  constructor(private router: Router){}

  openAuthorPosts(post: Post): void { // Red Path
    this.router.navigate(['/posts/users', post.author.id]);
  }

  openPost(post: Post): void { // Green Path
    this.router.navigate(['/posts', post.id]);
  }

}
