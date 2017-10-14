import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../category';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent {

  @Input() categories: Category[];

  @Output() categoryClicked = new EventEmitter<Category>(); // Yellow Path

  notifyCategoryClicked(category: Category): void { // Yellow Path
    this.categoryClicked.emit(category);
  }

}
