import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  selectedFile: File = null;
  downloadURL: Observable<string>;
  avatarLink: any = '../../../assets/images/default_avatar.png';
  fb: any = '../../../assets/images/default_avatar.png';
  photoPath: any = '';
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Name must be at least 5 characters long' },
      { type: 'maxlength', message: 'Name cannot be more than 25 characters long' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required' },
      { type: 'minlength', message: 'Surname must be at least 5 characters long' },
      { type: 'maxlength', message: 'Surname cannot be more than 25 characters long' }
    ],
    'age': [
      { type: 'required', message: 'Age is required' },
      { type: 'min', message: 'Age must be 18 at least' }
    ],
   
    }

  constructor( private firebaseService: FirebaseService, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.min(18)]),
      photoUrl: new FormControl('', []),
      photoPath: new FormControl('', [])
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value, this.fb, this.photoPath)
    .then(
      res => {
        console.log('res', res);
        this.resetFields();
        setTimeout(function(){
          window.location.href = './tabs/usuarios';
        }, 1000);
      }
    )
  }

  resetFields(){
    this.fb = '../../../assets/images/default_avatar.png';
    this.createForm();
  }

  openDialog(){
    console.log('openDialog');
  }
  onFileSelected(event) {
    var n = new Date().getTime();
    const file = event.target.files[0];
    const filePath = `Users/${n}`;
    this.photoPath = filePath;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Users/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
