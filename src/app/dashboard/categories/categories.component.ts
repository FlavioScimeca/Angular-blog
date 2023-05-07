import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryArray!: any;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit() {
    this.categoryService.loadData().subscribe((val: any) => {
      console.log(val);

      this.categoryArray = val;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value,
    };

    this.categoryService.saveData(categoryData);

    formData.reset();
  }
}
