import firebase from 'firebase';
import { firebaseConfig } from './config';
import { IAppStorage } from './interfaces/IAppStorage';

export class AppFirebase {
    firebaseStart: any;
    db: any;

    constructor() {

        if (!firebase.apps.length) {
            this.firebaseStart = firebase.initializeApp(firebaseConfig);
        } else {
            this.firebaseStart = firebase.app(); 
        }
        this.db = this.firebaseStart.firestore();
    }


    async addNote(note: IAppStorage) {
        const res = await this.db.collection('notes').add(note);

    }


    async deleteNote(id: string) {
        const res = await this.db.collection('notes').doc(id).delete();
    }


    async updateNote(id: string, note: IAppStorage) {
        const res = await this.db.collection('notes').doc(id).update(note);
    }


    async getNote(id: string) {
        return this.db.collection('notes').doc(id).get().then((res: any) => res.data())
    }

    async getNotes() {

        const collection = await this.db.collection('notes').get().then((res: any) => ({ size: res.size, docs: res.docs }));

        return collection.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }));

    }


}