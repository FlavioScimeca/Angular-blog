import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  postsArray: Array<object>;
  titleCategory: string;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.titleCategory = val['category'];
      this.categoriesService.loadCategoryPosts(val['id']).subscribe((posts) => {
        this.postsArray = posts;
      });
    });
  }
}
