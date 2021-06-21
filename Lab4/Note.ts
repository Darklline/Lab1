import { INote } from './types';

export class Note implements INote {
    Id: string;
    Title: string;
    Color: string;
    Content: string;
    Pinned: boolean;
    Date: Date;

    constructor(title: string, content: string, color: string, pinned: boolean = false) {
        this.Id = 'id' + Math.random().toString(16).slice(2);
        this.Title = title;
        this.Content = content;
        this.Color = color;
        this.Pinned = pinned;
        this.Date = new Date();
    }
}
