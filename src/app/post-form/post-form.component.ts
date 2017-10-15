import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Post } from '../post';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnChanges {

  postForm: FormGroup;

  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();
  @Input() postToEdit: Post; // Broken White Path

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder) {
      this.createForm();
    }

  ngOnChanges(){ // Broken White Path
    this.postForm.setValue({
      title: this.postToEdit.title,
      intro: this.postToEdit.intro,
      body: this.postToEdit.body
    })

  }

  private createForm() {

    this.postForm = this._formBuilder.group({ // Purple Path
      title: ['', Validators.required],
      intro: ['', Validators.required],
      body: ''
    });
  }

  emitPostSubmitted(): void { // Broken White Path
    const post: Post = this.postForm.value;
    post.likes = this.postToEdit? this.postToEdit.likes : [];
    post.categories = this.postToEdit? this.postToEdit.categories : [];
    post.author = this.postToEdit? this.postToEdit.author : this._userService.getDefaultUser();
    post.publicationDate = this.postToEdit? this.postToEdit.publicationDate : Date.now();
    post.media = this.postToEdit? this.postToEdit.media : null;
    post.id = this.postToEdit? this.postToEdit.id : null;
    this.postSubmitted.emit(post);
  }

}
