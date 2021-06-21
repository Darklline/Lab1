import { IAppStorage, StorageName } from './types';
import { db } from './firebaseConfig';

export class FireStorage<T extends { Id: string }> implements IAppStorage<T> {
    async saveItemToStorage(storageName: StorageName<T>, item: T): Promise<void> {
        const docRef = await db
            .collection(storageName)
            .doc(item.Id)
            .set({ ...item });
    }

    async getStorageData(storageName: StorageName<T>): Promise<T[]> {
        const dataArr: unknown[] = [];
        const snapshot = await db.collection(storageName).get();

        const data = snapshot.forEach(doc => dataArr.push(doc.data()));

        return dataArr as T[];
    }

    async removeItem(storageName: StorageName<T>, id: string) {
        const remove = await db.collection(storageName).doc(id).delete();
    }

    async updateItem(storageName: StorageName<T>, itemId: string, item: T) {
        const data = await db
            .collection(storageName)
            .doc(itemId)
            .set({ ...item });
    }
}
