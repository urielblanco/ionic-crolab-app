import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datetime = new Date().getTime();
  constructor(
    private db: AngularFirestore
  ) { }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('users').valueChanges()
      .subscribe(snapshots => {
        console.log('getUsers', snapshots);
        resolve(snapshots)
      })
    })
  }

  createUser(value, avatar){
    return this.db.collection('users').doc(`${this.datetime}`).set({
      id: this.datetime,
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(`${userKey}`).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('users').doc(`${userKey}`).delete();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }
    
  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value))
    .snapshotChanges();
   }

   setFavorite(uid, film){
     console.log('film', film);
     return this.db.collection(`${uid}`).doc(`${film.id}`).set(film);
   }

   removeFavorite(uid, filmId) {
    return this.db.collection(`${uid}`).doc(`${filmId}`).delete();
   }
}
