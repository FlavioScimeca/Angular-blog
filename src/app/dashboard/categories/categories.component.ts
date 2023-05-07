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
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;

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

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
    }

    formData.reset();
  }

  onEdit(data: any) {
    console.log(data);

    this.formCategory = data.data.category.category;
    this.categoryId = data.id;
    this.formStatus = 'Edit';
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
