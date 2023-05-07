import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private categoryService: CategoriesService,
    private formB: FormBuilder
  ) {
    this.postForm = this.formB.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      slug: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
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
}
