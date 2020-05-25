import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  items: any 

  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.getUsers()
    .then(result => {
       this.items = result;
     })
     .catch(error => {console.log('getusers ERROR', error);})
   }
   removeItem(item){
     this.firebaseService.deleteUser(`${item.id}`)
     .then(result => {
      window.location.reload();
     })
     .catch(error => {console.log('getusers ERROR', error);})
   }
}
