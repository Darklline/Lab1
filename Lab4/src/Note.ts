import { AppStorage } from './appStorage';
import { IAppStorage } from './interfaces/IAppStorage'
import { AppFirebase } from './appFirebase';
import { config } from './config'
import { Notes } from './Notes';


export class Note {
    constructor() {
        this.addNote();
    }
    // zczytywanie notatki za pomocą buttona
    async addNote() {
        const buttonAdd = document.getElementById('AddButton');
        buttonAdd.addEventListener('click', async (ev: MouseEvent) => {
            const takeTitle = <HTMLInputElement>document.getElementById('AddNote');
            const takeContent = <HTMLInputElement>document.getElementById('content');
            const contentNote = takeContent.value;
            const title = takeTitle.value;
            const tablica = JSON.parse(localStorage.getItem('note')) as IAppStorage[];
            let howMany = 0;

            if (tablica !== null) {
                howMany = tablica.length;
            } else {
                howMany = 0;
            }

            if ((title === '') || (title === 'null')) { }
            else {
                //interface notatki
                const notatka: IAppStorage = {
                    id: 1 + howMany,
                    title: title,
                    content: contentNote,
                    dateOfNote: new Date().toDateString(),
                }
                if (config) {
                    const warehouse = new AppStorage;
                    warehouse.saveData(notatka);
                } else {
                    const firebase = new AppFirebase();
                    firebase.addNote(notatka);
                }
                const containerOld = document.getElementById('container');
                containerOld.innerHTML = '';
                const refresher = new Notes();


                takeTitle.value = '';
                takeContent.value = '';
            }

        });
    }
}