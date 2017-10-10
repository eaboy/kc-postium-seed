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


  /*=========================================================================|
  | Red Path                                                                 |
  |==========================================================================|
  | Maneja el evento del componente PostPreviewComponent que indica la       |
  | selección del autor de un post y navega a la dirección correspondiente.  |
  | Recuerda que para hacer esto necesitas inyectar como dependencia el      |
  | Router de la app. La ruta a navegar es '/posts/users', pasando como      |
  | parámetro el identificador del autor.                                    |
  |=========================================================================*/

  openPost(post: Post): void {
    this.router.navigate(['/posts', post.id]); // Green Path
  }

}
