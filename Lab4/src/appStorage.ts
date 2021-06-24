import { IAppStorage } from './interfaces/IAppStorage';
import { Notes } from './Notes';
export class AppStorage {


    //zapis do localstorage
    saveData(newNote: IAppStorage) {
        const stickiNotes: IAppStorage[] = [];
        const checker = JSON.parse(localStorage.getItem('note')) as IAppStorage[];
        if (checker !== null) {
            checker.forEach((x: IAppStorage) => stickiNotes.push(x));
        }
        stickiNotes.push(newNote);
        localStorage.setItem('note', JSON.stringify(stickiNotes));
    }

}



