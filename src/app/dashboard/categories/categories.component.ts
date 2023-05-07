import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private categoryService: CategoriesService) {}

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value,
    };

    this.categoryService.saveData(categoryData);
  }
}
