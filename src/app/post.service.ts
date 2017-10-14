import { Category } from './category';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { Post } from './post';

@Injectable()
export class PostService {

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<Post[]> {

    const httpOptions = { // Pink Path
      params: new HttpParams()
        .set('_sort', 'publicationDate')
        .set('_order', 'desc')
        .set('publicationDate_lte', `${Date.now()}`)
    };

    return this._http.get<Post[]>(`${environment.backendUri}/posts`, httpOptions); // Pink Path
  }

  getUserPosts(id: number): Observable<Post[]> {

    const httpOptions = { // Red Path
      params: new HttpParams()
        .set('_sort', 'publicationDate')
        .set('_order', 'desc')
        .set('publicationDate_lte', `${Date.now()}`)
        .set('author.id', `${id}`)
    };

    return this._http.get<Post[]>(`${environment.backendUri}/posts`, httpOptions); // Red Path
  }

  getCategoryPosts(id: number): Observable<Post[]> {

    const httpOptions = { // Yellow Path
      params: new HttpParams()
        .set('_sort', 'publicationDate')
        .set('_order', 'desc')
        .set('publicationDate_lte', `${Date.now()}`)
    };
    return this._http.get<Post[]>(`${environment.backendUri}/posts`, httpOptions).map((posts: Post[]) => { // Yellow Path
      return posts.filter((post: Post) => this.hasCategory(post, id));
    });
  }

  private hasCategory(post: Post, categoryId: number): Boolean { // Yellow Path
    return post.categories.filter((category) => category.id == categoryId).length > 0;
  }

  getPostDetails(id: number): Observable<Post> {
    return this._http.get<Post>(`${environment.backendUri}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {

    /*=========================================================================|
    | Purple Path                                                              |
    |==========================================================================|
    | Utiliza el cliente HTTP para guardar en servidor el post indicado. La    |
    | ruta sobre la cual tienes que hacer la petición POST es '/posts'.        |
    | Recuerda que siempre que se crea una entidad en servidor es una buena    |
    | práctica retornar la misma con los datos actualizados obtenidos tras la  |
    | inserción.                                                               |
    |=========================================================================*/

    return null;
  }

}
