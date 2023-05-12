import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  slugTitle!: string;
  imgSrc: any = 'assets/placeholder-image.jpg';
  selectedImg!: any;
  categories!: any;

  postForm!: any;
  singlePost!: any;

  formStatus: string = 'Add new';

  constructor(
    private categoryService: CategoriesService,
    private postService: PostsService,
    private formB: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) =>
      postService.loadSingleData(val['id']).subscribe((post) => {
        this.singlePost = post;

        this.postForm = this.formB.group({
          title: [
            this.singlePost.title,
            [Validators.required, Validators.minLength(10)],
          ],
          slug: [this.singlePost.slug, [Validators.required]],
          excerpt: [
            this.singlePost.excerpt,
            [Validators.required, Validators.minLength(50)],
          ],
          category: [
            `${this.singlePost.category.categoryId}-${this.singlePost.category.category}`,
            [Validators.required],
          ],
          postImg: ['', [Validators.required]],
          content: [this.singlePost.content, [Validators.required]],
        });

        this.imgSrc = this.singlePost.postImgPath;
        this.formStatus = 'Edit';
      })
    );
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get formControl() {
    return this.postForm.controls;
  }

  generateSlug(event: any) {
    const title: string = event.target.value;
    const generatSlugTitle = title.replace(/\s/g, '-');

    this.slugTitle = generatSlugTitle;
  }

  showPreview(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      slug: this.postForm.value.slug,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(this.selectedImg, postData);
    this.postForm.reset();
    this.imgSrc = 'assets/placeholder-image.jpg';
  }
}
