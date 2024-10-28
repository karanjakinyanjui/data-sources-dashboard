import { openDB } from 'idb';

const DB_NAME = 'datasources_db';
const STORE_NAME = 'datasources';

export interface DataSource {
  id?: number;
  name: string;
  url: string;
  cached_at: Date;
}

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const addDataSource = async (dataSource: Omit<DataSource, 'id' | 'cached_at'>) => {
  const db = await initDB();
  return db.add(STORE_NAME, {
    ...dataSource,
    cached_at: new Date(),
  });
};

export const getAllDataSources = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteDataSource = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};