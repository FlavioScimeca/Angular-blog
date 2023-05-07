import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';

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
}
