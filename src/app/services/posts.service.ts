import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private ngStorage: AngularFireStorage,
    private NgFirestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  uploadImage(selectedImage: string, postData: Post) {
    const filePath = `postIMG/${Date.now()}`;

    this.ngStorage.upload(filePath, selectedImage).then(() => {
      console.log('uploaded successfully');

      this.ngStorage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((url) => {
          postData.postImgPath = url;

          this.saveData(postData);
        });
    });
  }

  saveData(postData: Post) {
    this.NgFirestore.collection('posts')
      .add(postData)
      .then(() => {
        this.toastr.success('post added!');
      });
  }
}
