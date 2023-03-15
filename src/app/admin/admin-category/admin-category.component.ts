import { Component } from '@angular/core';
import {
  CatogoryServiceService,
  ICategoryResponse,
} from 'src/app/service/category/catogory-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Storage,
  percentage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent {
  public hide = true;
  public adminCategories: Array<ICategoryResponse> = [];
  public uploadPercent!: number;
  public categoryForm!: FormGroup;
  public editStatus = false;
  private currentActionId = 0;
  public isUploaded = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CatogoryServiceService,
    private storage: Storage
  ) {}

  hider() {
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
        Validators.required,
      ],
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data;
    });
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .update(this.categoryForm.value, this.currentActionId)
        .subscribe(() => {
          this.loadCategories();
        });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      });
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.hide = true;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCategory(category: ICategoryResponse): void {
    this.hide = false;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.editStatus = true;
    this.currentActionId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse) {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('imagesushi', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async uploadFile(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null,
      });
    });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
