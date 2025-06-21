import { openDB } from 'idb';

const DB_NAME = 'taskManager';
const STORE_NAME = 'tasks';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveTask = async (task) => {
  const db = await initDB();
  await db.put(STORE_NAME, task);
};

export const getAllTasks = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteTask = async (id) => {
  const db = await initDB();
  return await db.delete(STORE_NAME, id);
};
