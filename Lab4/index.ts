import { INote } from './types';
import { AppStorage } from './AppStorage';
import { AppNotes } from './AppNotes';
import './main.scss';
//import { FireStorage } from './FireStorage';

const noteStorage = new AppStorage<INote>();
//const fireStorage = new FireStorage<INote>();
const appNotes = new AppNotes(noteStorage);
