import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  query,
  where,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { signOut } from '@firebase/auth';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';

export interface user {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private auth: Auth, private _firestore: Firestore) { }

  async register(user: user) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  async signIn(user: user) {
    return await signInWithEmailAndPassword(this.auth, user.email, user.password)
  }

  async signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider);
  }

  getNotes():Observable<Note[]> {
    const notesObservable:any = collectionData(query(collection(this._firestore, 'notes'), where('archived', '==', false)), {idField: 'id'});
    return notesObservable;
  }

  getArchivedNotes():Observable<Note[]> {
    const notesObservable:any = collectionData(query(collection(this._firestore, 'notes'), where('archived', '==', true)), {idField: 'id'});
    return notesObservable;
  }

  async postNote(data:Note) {
    return await setDoc(doc(collection(this._firestore, 'notes'), data.id), {
      title: data.title,
      description: data.description,
      date: data.date,
      archived: data.archived
    })
  }

  async archiveNote(id: string) {
    return await updateDoc(doc(this._firestore, "notes", id), {archived: true})
  }

  async unarchiveNote(id: string) {
    return await updateDoc(doc(this._firestore, "notes", id), {archived: false})
  }

  async deleteNote(id: string) {
    return await deleteDoc(doc(this._firestore, "notes", id))
  }

  async logout() {
    return await signOut(this.auth);
  }
}
