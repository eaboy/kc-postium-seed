 // Broken White Path

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html'
})
export class EditStoryComponent implements OnDestroy, OnInit {

  private _postSubscription: Subscription;
  postToEdit: Post;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) { }
  
  ngOnInit(): void {
    this._activatedRoute
        .data
        .subscribe((data: { post: Post }) => {
          this.postToEdit = data.post;
          if(this.postToEdit.author.id !== this._userService.getDefaultUser().id){
            this._router.navigate(['/']);
          }
        });
  }
  
  ngOnDestroy(): void {
    this._unsubscribePostUpdate();
  }

  updatePost(post: Post): void {
    this._unsubscribePostUpdate();
    this._postSubscription = this._postService
                                 .updatePost(post)
                                 .subscribe(() => this._router.navigate(['/']));
  }
  
  private _unsubscribePostUpdate(): void {
    if (this._postSubscription) {
      this._postSubscription.unsubscribe();
    }
  }

}
