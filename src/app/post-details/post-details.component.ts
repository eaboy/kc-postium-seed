import { UserService } from '../user.service';
import { Category } from '../category';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NativeWindow } from '../window';
import { Post } from '../post';

@Component({
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post;

  constructor(
    private router: Router, // Red Path
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService, // Broken White Path
    @Inject(NativeWindow) private _window) { }

  ngOnInit(): void {
    this._activatedRoute
        .data
        .subscribe((data: { post: Post }) => {
          this.post = data.post;
          this._window.scrollTo(0, 0);
        });
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

  authorClicked(post: Post): void { // Red Path
    this.router.navigate(['/posts/users', post.author.id]);
  }

  openCategoryPosts(category: Category): void { // Yellow Path
    this.router.navigate(['/posts/categories', category.id]);
  }
  
  private sameUser(): Boolean { // Broken White Path
    return this._userService.getDefaultUser().id === this.post.author.id;
  }

  private gotoEditPost(post: Post): void { // Broken White Path
    this.router.navigate(['/edit-story', post.id]);
  }

}
