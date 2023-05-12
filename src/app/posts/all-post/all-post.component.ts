import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss'],
})
export class AllPostComponent implements OnInit {
  postArray!: Array<any>;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.loadData().subscribe((val) => (this.postArray = val));
  }

  onDelete(postImgPath: string, postId: string) {
    this.postsService.deleteImage(postImgPath, postId);
  }
  onFeatured(postId: string, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };

    this.postsService.markFeatured(postId, featuredData);
  }
}
