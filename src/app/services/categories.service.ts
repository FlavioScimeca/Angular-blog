import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private NgFirestore: AngularFirestore) {}

  saveData(inputData: Category) {
    this.NgFirestore.collection('categories')
      .add(inputData)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => console.log(err));
  }
}
