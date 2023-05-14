import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private NgFirestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  saveData(inputData: Category) {
    this.NgFirestore.collection('categories')
      .add(inputData)
      .then((docRef) => {
        this.toastr.success('Category created!');
      })
      .catch((err) => console.log(err));
  }

  loadData() {
    return this.NgFirestore.collection('categories')
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

  updateData(id: string, inputData: Category) {
    this.NgFirestore.collection('categories')
      .doc(id)
      .update(inputData)
      .then(() => {
        this.toastr.success('Category edited!');
      });
  }

  deleteData(id: string) {
    // this.NgFirestore.collection('categories')
    //   .doc(id)
    //   .delete()
    //   .then(() => {
    //     this.toastr.warning('Category deleted');
    //   });

    this.NgFirestore.doc(`categories/${id}`)
      .delete()
      .then(() => {
        this.toastr.warning('Category deleted');
      });
  }

  loadCategoryPosts(categoryId: string) {
    return this.NgFirestore.collection('posts', (ref) =>
      ref.where('category.categoryId', '==', categoryId)
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
}
