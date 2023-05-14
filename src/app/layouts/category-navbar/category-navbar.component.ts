import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss'],
})
export class CategoryNavbarComponent implements OnInit {
  categoryArray: Array<object>;

  constructor(private categoryService: CategoriesService) {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });
  }

  ngOnInit(): void {}
}
