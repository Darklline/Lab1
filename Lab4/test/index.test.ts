import { IAppStorage } from '../src/interfaces/IAppStorage'
import { AppFirebase } from '../src/appFirebase'


describe('AppFirebase', () => {
    const notatka: IAppStorage = {
        id: 123,
        title: "title",
        content: "test content",
        dateOfNote: new Date().toDateString(),
    }
    const warehouse = new AppFirebase;
    warehouse.addNote(notatka);
    it('test 0', () => {
        const ret = warehouse.getNote('123')
        expect(ret).toBe(notatka);
    });
});