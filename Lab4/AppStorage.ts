import { IAppStorage, StorageName, INote } from './types';
import { isNoteType } from './typeGuards';
import { safeJsonParse } from './utils';

export class AppStorage<T> implements IAppStorage<T> {
    async saveItemToStorage(storageName: StorageName<T>, item: T) {
        const data = localStorage.getItem(storageName);
        if (!data) {
            localStorage.setItem(storageName, JSON.stringify([item]));
            return;
        }

        localStorage.setItem(storageName, JSON.stringify([...JSON.parse(data), item]));
    }

    async getStorageData(storageName: StorageName<T>): Promise<T[]> {
        return new Promise(resolve => {
            const data = localStorage.getItem(storageName);
            if (!data) {
                return resolve([]);
            }

            return resolve(JSON.parse(data));
        });
    }

    async removeItem(storageName: StorageName<T>, id: string) {
        const data = localStorage.getItem(storageName);
        if (!data) return;

        const parsedData = safeJsonParse(isNoteType, data);

        if (!parsedData.hasError) {
            const newData = parsedData.parsed.filter(item => item.Id !== id);

            localStorage.setItem(storageName, JSON.stringify(newData));
        }
    }
    async updateItem(storageName: StorageName<T>, itemId: string, item: T) {
        const data = localStorage.getItem(storageName);
        if (!data) return;

        const parsedData = safeJsonParse(isNoteType, data);
        if (!parsedData.hasError) {
            const newData = parsedData.parsed.map(item => {
                if (item.Id === itemId) {
                    return {
                        ...item,
                    };
                }

                return item;
            });

            localStorage.setItem(storageName, JSON.stringify(newData));
        }
    }
}
