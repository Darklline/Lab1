export interface INote {
    Id: string;
    Title: string;
    Content: string;
    Color: string;
    Pinned: boolean;
    Date: Date;
}

type LocalStorageNames = {
    notes: string;
};

export type StorageName<T> = T extends INote ? keyof LocalStorageNames : never;

export interface IAppStorage<T> {
    saveItemToStorage: (storageName: StorageName<T>, item: T) => Promise<void>;
    getStorageData: (storageName: StorageName<T>) => Promise<T[]>;
    removeItem: (StorageName: StorageName<T>, itemId: string) => Promise<void>;
    updateItem: (storageName: StorageName<T>, itemId: string, item: T) => Promise<void>;
}

export enum NoteColors {
    yellow = '#f9eea0',
    white = '#FFFFFF ',
    blue = '#abdfd8',
    green = '#ACF8B5',
}

export type CreateNoteType = {
    noteElement: HTMLElement;
    isPinned: boolean;
};

export type Action =
    | {
          type: 'delete';
          payload: {
              noteId: string;
          };
      }
    | {
          type: 'pin';
          payload: {
              noteId: string;
          };
      }
    | {
          type: 'edit';
          payload: {
              noteId: string;
          };
      }
    | {
          type: 'create';
          payload: {
              title: string;
              pinned: boolean;
              content: string;
              color: string;
          };
      }
    | {
          type: 'update';
          payload: {
              id: string;
              title: string;
              pinned: boolean;
              content: string;
              color: string;
          };
      };

export type DataAction = Action['type'];
