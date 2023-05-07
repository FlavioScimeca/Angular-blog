import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  slugTitle!: string;
  imgSrc: any = 'assets/placeholder-image.jpg';
  selectedImg!: any;

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
