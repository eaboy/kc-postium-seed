import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Post } from '../post';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  postForm: FormGroup;

  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder) {
      this.createForm();
    }

  private createForm() {

    this.postForm = this._formBuilder.group({ // Purple Path
      title: ['', Validators.required],
      intro: ['', Validators.required],
      body: ''
    });
  }

  emitPostSubmitted(): void {
    const post: Post = this.postForm.value;
    post.likes = [];
    post.categories = [];
    post.author = this._userService.getDefaultUser();
    post.publicationDate = Date.now();
    this.postSubmitted.emit(post);
  }

}
