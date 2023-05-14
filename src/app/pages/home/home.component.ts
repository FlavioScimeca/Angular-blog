import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postsArray: Array<object>;

  latestPostsArray: Array<object>;

  constructor(private postsService: PostsService) {
    this.postsService.loadFeaturedData().subscribe((val) => {
      this.postsArray = val;
    });

    postsService.loadLatestdData().subscribe((val) => {
      this.latestPostsArray = val;
    });
  }

  ngOnInit(): void {}
}
