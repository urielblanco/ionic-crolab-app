import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  avatarLink: any = '../../../assets/images/default_avatar.png';
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

  constructor( private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.min(18)])
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value, this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/userList']);
      }
    )
  }

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.createForm();
  }

  openDialog(){
    console.log('openDialog');
  }
}
