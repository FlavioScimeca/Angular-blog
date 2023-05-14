import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  status: boolean = false;
  postsArray: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postsService.countViews(val['id']);

      this.postsService.loadSingleData(val['id']).subscribe((posts) => {
        this.postData = posts;

        this.categoriesService
          .loadSimilarCategoryPosts(this.postData.category.categoryId)
          .subscribe((posts) => {
            this.postsArray = posts;
          });
      });

      this.status = true;
    });
  }
}
