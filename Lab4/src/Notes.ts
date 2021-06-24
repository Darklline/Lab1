import { AppFirebase } from './appFirebase';
import { AppStorage } from './appStorage';
import { IAppStorage } from './interfaces/IAppStorage';

const appStorage = new AppStorage();
export class Notes {
    constructor() {
        this.loadFromStorage();
        this.loadFromFirebase();
    };

    private loadFromStorage() {
        const data = localStorage.getItem('note');
        if (data) {
            const noteColection = JSON.parse(data) as any[];
            noteColection.forEach(x => this.newStickyNote(x));
        }
    }

    async loadFromFirebase() {
        const data = new AppFirebase;
        const nota = await data.getNotes();
        nota.forEach((x: any) => this.newStickyNote(x.data));
    }


    newStickyNote(newNote: IAppStorage) {
        const noteWindow = document.createElement('div');
        noteWindow.className = 'noteWind';
        noteWindow.setAttribute('id', 'noteWindId');
        const container = document.getElementById('container');

        const noteTitle = document.createElement('h1');
        const noteContent = document.createElement('h2');
        const noteDate = document.createElement('h3');
        noteTitle.innerHTML = newNote.title;
        noteContent.innerHTML = newNote.content;
        noteDate.innerHTML = newNote.dateOfNote;
        container.appendChild(noteWindow);
        noteWindow.appendChild(noteTitle);
        noteWindow.appendChild(noteContent);
        noteWindow.appendChild(noteDate);
    }
}