import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datetime = new Date().getTime();
  constructor(
    private db: AngularFirestore, 
    private storage: AngularFireStorage
  ) { }

  getUsers(){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('users').valueChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

  createUser(value, avatar, photoPath){
    return this.db.collection('users').doc(`${this.datetime}`).set({
      id: this.datetime,
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar,
      photoPAth: photoPath
    });
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(`${userKey}`).set(value);
  }

  deleteUser(userKey, userPhoto){
    let vm = this;
    return this.db.collection('users').doc(`${userKey}`)
    .delete()
    .then(function(){
      try{
        vm.storage.storage.refFromURL(`${userPhoto}`).delete()
      }
      catch(error){console.log('deleteUser error', error)}
      })
    .catch(error => console.log('deleteUser error', error));
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


  setToken(userId, token){
    let resolve: any = '';
    this.db.collection('tokens').doc(`${userId}`).set({token: token})
    .then(resp => {
      resolve = resp;
    })
    .catch(error => {
      resolve = error;
    })
    .finally(()=> {return resolve;})
  }

  updateToken(userId, token){
    let resolve: any = '';
    this.db.collection('tokens').doc(`${userId}`).set({token: token})
    .then(resp => {
      resolve = resp;
    })
    .catch(error => {
      return this.setToken(userId, token);
    })
    .finally(()=> {return resolve;})
  }

   setFavorite(uid, film){
     return this.db.collection(`${uid}`).doc(`${film.id}`).set(film);
   }

   removeFavorite(uid, filmId) {
    return this.db.collection(`${uid}`).doc(`${filmId}`).delete();
   }
}
