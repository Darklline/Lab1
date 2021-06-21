import { INote } from './types';

export const isNoteType = (item: any): item is INote => 'Title' in item && 'Pinned' in item;
