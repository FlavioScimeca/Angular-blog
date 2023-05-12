import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private ngStorage: AngularFireStorage,
    private NgFirestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
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
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.NgFirestore.collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  loadSingleData(id: string) {
    return this.NgFirestore.collection('posts').doc(id).valueChanges();
    // this.NgFirestore.doc(`posts/${id}`).valueChanges()
  }
}
