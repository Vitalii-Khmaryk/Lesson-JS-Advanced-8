import { Component } from '@angular/core';
import {
  ActionServiceService,
  IActionResponse,
} from 'src/app/service/action-service.service';
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
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
  public hide = true;
  public adminActions: Array<IActionResponse> = [];
  public uploadPercent!: number;
  public actionForm!: FormGroup;
  public editStatus = false;
  private currentActionId = 0;
  public isUploaded = false;
  constructor(
    private fb: FormBuilder,
    private actionService: ActionServiceService,
    private storage: Storage
  ) {}

  hider() {
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }

  initActionForm() {
    this.actionForm = this.fb.group({
      date: Date.now(),
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
        Validators.required,
      ],
    });
  }

  loadActions() {
    this.actionService.getAll().subscribe((data) => {
      this.adminActions = data;
    });
  }

  addAction(): void {
    if (this.editStatus) {
      this.actionService
        .update(this.actionForm.value, this.currentActionId)
        .subscribe(() => {
          this.loadActions();
        });
    } else {
      this.actionService.create(this.actionForm.value).subscribe(() => {
        this.loadActions();
      });
    }
    this.editStatus = false;
    this.actionForm.reset();
    this.hide = true;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editAction(action: IActionResponse): void {
    this.hide = false;
    this.actionForm.patchValue({
      date: Date.now(),
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath,
    });
    this.editStatus = true;
    this.currentActionId = action.id;
    this.isUploaded = true;
  }

  deleteAction(action: IActionResponse) {
    this.actionService.delete(action.id).subscribe(() => {
      this.loadActions();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('imagesushi', file.name, file)
      .then((data) => {
        this.actionForm.patchValue({
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
      this.actionForm.patchValue({
        imagePath: null,
      });
    });
  }

  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value;
  }
}
