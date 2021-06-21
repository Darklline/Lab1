import { INote, Action } from './types';
import { AppStorage } from './AppStorage';
import { Note } from './Note';
import { NotesDomManager } from './NotesDomManager';

export class AppNotes {
    private NoteStorage: AppStorage<INote>;
    private Notes: INote[];
    private NotesDomManager = new NotesDomManager<AppNotes>();

    constructor(noteStorage: AppStorage<INote>) {
        this.NoteStorage = noteStorage;
        this.Notes = [];
        this.NotesDomManager.attatchSubscriber(this);

        this.loadNotes();
    }

    async tryGetNotes() {
        try {
            const notes = await this.NoteStorage.getStorageData('notes');

            if (notes.length > 0) {
                this.Notes = notes;
                return notes;
            }

            return null;
        } catch (err) {
            console.log(err);
        }
    }

    async loadNotes() {
        const loadedNotes = await this.tryGetNotes();
        loadedNotes && this.renderNotes(loadedNotes);
    }

    renderNotes(notes: INote[]) {
        this.NotesDomManager.clearContainers();
        notes
            .map(this.NotesDomManager.createNoteElement)
            .map(this.NotesDomManager.appendNodeElement);
    }

    createNewNote({
        Title,
        Color,
        Content,
        Pinned,
    }: Pick<INote, 'Title' | 'Color' | 'Content' | 'Pinned'>) {
        const note = new Note(Title, Content, Color, Pinned);

        this.Notes = [...this.Notes, note];

        this.NoteStorage.saveItemToStorage('notes', note);

        const created = this.NotesDomManager.createNoteElement(note);
        this.NotesDomManager.appendNodeElement(created);
    }

    deleteNote(id: string) {
        const isNoteExist = this.Notes.some(note => note.Id === id);

        if (isNoteExist) {
            const newNotes = this.Notes.filter(note => note.Id !== id);

            this.NoteStorage.removeItem('notes', id);
            this.Notes = newNotes;
            this.renderNotes(newNotes);
        }
    }

    toggleNotePin(id: string) {
        const notes = this.Notes.map(note => {
            if (note.Id === id) {
                note.Pinned = !note.Pinned;
            }
            return note;
        });
        this.renderNotes(notes);
    }

    updateNote(note: INote) {
        const updatedNotes = this.Notes.map(n => {
            if (n.Id === note.Id) {
                const updatedNote = {
                    ...note,
                };
                return updatedNote;
            }
            return n;
        });

        this.Notes = updatedNotes;
        this.NoteStorage.updateItem('notes', note.Id, note);
        this.renderNotes(updatedNotes);
        this.NotesDomManager.hideModal();
    }
    update(action: Action) {
        switch (action.type) {
            case 'delete': {
                const { noteId } = action.payload;
                this.deleteNote(noteId);
                break;
            }

            case 'pin': {
                const { noteId } = action.payload;
                this.toggleNotePin(noteId);
                break;
            }

            case 'create': {
                const { title, color, pinned, content } = action.payload;
                this.createNewNote({
                    Title: title,
                    Color: color,
                    Pinned: pinned,
                    Content: content,
                });
                break;
            }

            case 'edit': {
                const { noteId } = action.payload;
                const note = this.Notes.find(n => n.Id === noteId);
                note && this.NotesDomManager.showModal(note);
                break;
            }

            case 'update': {
                const { title, id, content, pinned, color } = action.payload;
                this.updateNote({
                    Title: title,
                    Id: id,
                    Content: content,
                    Pinned: pinned,
                    Color: color,
                    Date: new Date(),
                });
            }
        }
    }
}
