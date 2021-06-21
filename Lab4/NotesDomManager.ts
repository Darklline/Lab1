import { INote, Action, NoteColors, DataAction, CreateNoteType } from './types';

export class NotesDomManager<T extends { update: (action: Action) => void }> {
    private Subscribers: T[] = [];
    private HTMLForm: HTMLFormElement;
    private HTMLModalForm: HTMLFormElement;
    private currentNoteId: string;
    constructor() {
        this.currentNoteId = '';
        this.HTMLForm = document.querySelector('.note-creator') as HTMLFormElement;
        this.HTMLModalForm = document.querySelector('.note-editor') as HTMLFormElement;
        this.appendCreationFormListeners();
        this.appendEditFormListeners();
        this.appendActionListener();
    }

    appendActionListener() {
        const pinnedContainer = document.querySelector('.pinnedContainer') as HTMLDivElement;
        const notesContainer = document.querySelector('.notesContainer') as HTMLDivElement;

        pinnedContainer.addEventListener('click', e => this.actionListener(e));
        notesContainer.addEventListener('click', e => this.actionListener(e));
    }

    actionListener(e: Event) {
        const target = e.target as HTMLElement;
        if (!target || target.tagName !== 'BUTTON') return;

        const dataAction = target.dataset.action as DataAction;

        const findNoteElement = target.closest('.noteBox') as HTMLElement | undefined;
        switch (dataAction) {
            case 'delete': {
                const deleteAction: Action = {
                    type: 'delete',
                    payload: {
                        noteId: findNoteElement ? (findNoteElement.dataset.id as string) : '',
                    },
                };
                this.notify(deleteAction);
                break;
            }
            case 'pin': {
                const pinAction: Action = {
                    type: 'pin',
                    payload: {
                        noteId: findNoteElement ? (findNoteElement.dataset.id as string) : '',
                    },
                };
                this.notify(pinAction);
                break;
            }
            case 'edit': {
                const editAction: Action = {
                    type: 'edit',
                    payload: {
                        noteId: findNoteElement ? (findNoteElement.dataset.id as string) : '',
                    },
                };
                this.notify(editAction);
                break;
            }
        }
    }

    appendNodeElement(createdNote: CreateNoteType) {
        if (createdNote.isPinned) {
            const pinnedContainer = document.querySelector('.pinnedContainer');
            pinnedContainer && pinnedContainer.appendChild(createdNote.noteElement);
            return;
        }

        const notesContainer = document.querySelector('.notesContainer');
        notesContainer && notesContainer.appendChild(createdNote.noteElement);
    }

    clearContainers() {
        const pinnedContainer = document.querySelector('.pinnedContainer') as HTMLDivElement;
        const notesContainer = document.querySelector('.notesContainer') as HTMLDivElement;

        pinnedContainer.textContent = '';
        notesContainer.textContent = '';
    }

    attatchSubscriber(sub: T) {
        this.Subscribers.push(sub);
    }

    getSubscribers() {
        return this.Subscribers;
    }

    notify(action: Action) {
        this.Subscribers.map(el => el.update(action));
    }

    appendCreationFormListeners() {
        this.HTMLForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const elements = form.elements;

            const title = (elements[0] as HTMLInputElement).value;
            const content = (elements[1] as HTMLInputElement).value;
            const isPinned = (elements[2] as HTMLInputElement).checked;
            if (title === '') return;

            this.notify({
                type: 'create',
                payload: {
                    title,
                    content,
                    pinned: isPinned,
                    color: form.style.backgroundColor,
                },
            });
            form.reset();
        });

        const colorPicker = document.querySelector(
            '.note-creator__color-container',
        ) as HTMLDivElement;
        colorPicker.addEventListener('click', e => {
            const target = e.target as HTMLDivElement;
            const targetColor = target.dataset.color as keyof typeof NoteColors;

            if (!targetColor) return;

            this.HTMLForm.style.backgroundColor = NoteColors[targetColor];
        });
    }

    appendEditFormListeners() {
        this.HTMLModalForm.addEventListener('submit', e => {
            e.preventDefault();

            const form = e.currentTarget as HTMLFormElement;
            const elements = form.elements;

            const title = (elements[1] as HTMLInputElement).value;
            const content = (elements[2] as HTMLInputElement).value;
            const isPinned = (elements[3] as HTMLInputElement).checked;
            console.log(elements);
            const updateAction: Action = {
                type: 'update',
                payload: {
                    title,
                    content,
                    pinned: isPinned,
                    color: form.style.backgroundColor,
                    id: this.currentNoteId,
                },
            };

            this.notify(updateAction);
        });

        const colorPicker = document.querySelector(
            '.note-editor__color-container',
        ) as HTMLDivElement;
        const close = document.querySelector('.editContainer__close') as HTMLButtonElement;

        colorPicker.addEventListener('click', e => {
            const target = e.target as HTMLDivElement;
            const targetColor = target.dataset.color as keyof typeof NoteColors;

            if (!targetColor) return;

            this.HTMLModalForm.style.backgroundColor = NoteColors[targetColor];
        });

        close.addEventListener('click', () => {
            this.hideModal();
        });
    }

    showModal(note: INote) {
        this.currentNoteId = note.Id;

        const title = this.HTMLModalForm.querySelector('.note-editor__title') as HTMLInputElement;
        const content = this.HTMLModalForm.querySelector(
            '.note-editor__textarea',
        ) as HTMLInputElement;
        const isPinned = this.HTMLModalForm.querySelector(
            ".note-editor input[type='checkbox'",
        ) as HTMLInputElement;

        title.value = note.Title;
        content.value = note.Content;
        isPinned.checked = note.Pinned;

        if (this.HTMLModalForm.parentElement) {
            this.HTMLModalForm.parentElement.className = 'editContainer editContainer--active';
        }
    }

    hideModal() {
        if (this.HTMLModalForm.parentElement) {
            this.HTMLModalForm.parentElement.className = 'editContainer';
        }
    }

    createNoteElement(note: INote): CreateNoteType {
        const div = document.createElement('div');
        div.style.backgroundColor = note.Color;
        div.className = 'noteBox';
        div.dataset.id = note.Id;

        const h2 = document.createElement('h1');

        h2.textContent = note.Title;
        const content = document.createElement('p');

        content.textContent = note.Content;

        const deleteText = document.createElement('button');
        deleteText.textContent = 'Delete';
        deleteText.className = 'action-button';
        deleteText.dataset.action = 'delete';

        const editText = document.createElement('button');
        editText.textContent = 'Edit';
        editText.className = 'action-button';
        editText.dataset.action = 'edit';

        const pinText = document.createElement('button');
        pinText.textContent = note.Pinned ? 'Unpin' : 'Pin';
        pinText.className = 'action-button';
        pinText.dataset.action = 'pin';

        const footer = document.createElement('div');
        footer.appendChild(deleteText);
        footer.appendChild(editText);
        footer.appendChild(pinText);

        div.appendChild(h2);
        div.appendChild(content);
        div.appendChild(footer);

        return { noteElement: div, isPinned: note.Pinned };
    }
}
