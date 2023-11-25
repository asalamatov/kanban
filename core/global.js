import { create } from 'zustand';
import dbdata from '@utils/dbdata';

const useGlobal = create((set, get) => ({
    columns: dbdata.boards,

    addColumn: (obj) => {
        set(state => ({
            ...columns,
            obj
        }))
    }
}))



export default useGlobal;
