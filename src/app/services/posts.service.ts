import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/firestore';
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

  uploadImage(
    selectedImage: string,
    postData: Post,
    formStatus: string,
    id: string
  ) {
    const filePath = `postIMG/${Date.now()}`;

    this.ngStorage.upload(filePath, selectedImage).then(() => {
      console.log('uploaded successfully');

      this.ngStorage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((url) => {
          postData.postImgPath = url;

          if (formStatus == 'edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
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

  loadFeaturedData() {
    return this.NgFirestore.collection('posts', (ref) =>
      ref.where('isFeatured', '==', true).limit(4)
    )
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

  loadLatestdData() {
    return this.NgFirestore.collection('posts', (ref) =>
      ref.orderBy('createdAt')
    )
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

  updateData(id: string, postData: Post) {
    this.NgFirestore.doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Post successfully update');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImgPath: string, postId: string) {
    this.ngStorage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(postId);
      });
  }

  deleteData(postId: string) {
    this.NgFirestore.doc(`posts/${postId}`)
      .delete()
      .then(() => {
        this.toastr.warning('Post deleted');
      });
  }

  markFeatured(id: string, featuredPost: { isFeatured: boolean }) {
    this.NgFirestore.doc(`posts/${id}`)
      .update(featuredPost)
      .then(() => {
        this.toastr.info('Featured status updated');
      });
  }

  countViews(postId: string) {
    const viewsCount = {
      views: firebase.increment(1),
    };

    this.NgFirestore.doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => {
        console.log('Views incremented');
      });
  }
}
