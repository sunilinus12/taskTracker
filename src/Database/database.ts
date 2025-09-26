import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const databaseConfig = {
  name: 'TaskManager.db',
  location: 'default',
};

let db: SQLiteDatabase;

export type Task = {
  id: string | number;
  title: string;
  description?: string;
  status: 'completed' | 'overdue' | 'pending' | string;
  priority: 'high' | 'medium' | 'low' | 'default';
  updatedAt: string;
  dueDate?: string;
};

export const DB = {
  init: async (): Promise<void> => {
    try {
      db = await SQLite.openDatabase(databaseConfig);

      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          priority TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          dueDate TEXT
        );`,
      );
    } catch (error) {
      console.error('DB init error:', error);
    }
  },

  insertTask: async (task: Task): Promise<void> => {
    const query = `INSERT OR REPLACE INTO tasks 
      (id, title, description, status, priority, updatedAt, dueDate) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.executeSql(query, [
      String(task.id),
      task.title,
      task.description || '',
      task.status,
      task.priority,
      task.updatedAt,
      task.dueDate || '',
    ]);
  },

  updateTask: async (task: Task): Promise<void> => {
    const query = `UPDATE tasks 
      SET title=?, description=?, status=?, priority=?, updatedAt=?, dueDate=? 
      WHERE id=?`;
    await db.executeSql(query, [
      task.title,
      task.description || '',
      task.status,
      task.priority,
      task.updatedAt,
      task.dueDate || '',
      String(task.id),
    ]);
  },

  deleteTask: async (id: string | number): Promise<void> => {
    const query = `DELETE FROM tasks WHERE id=?`;
    await db.executeSql(query, [String(id)]);
  },

  clearTasks: async (): Promise<void> => {
    const query = `DELETE FROM tasks`;
    await db.executeSql(query);
  },

  getAllTasks: async (): Promise<Task[]> => {
    const results = await db.executeSql(`SELECT * FROM tasks`);
    const tasks: Task[] = [];

    results.forEach((result: ResultSet) => {
      for (let i = 0; i < result.rows.length; i++) {
        tasks.push(result.rows.item(i));
      }
    });
    return tasks;
  },

  getTaskById: async (id: string | number): Promise<Task | null> => {
    const results = await db.executeSql(`SELECT * FROM tasks WHERE id=?`, [
      String(id),
    ]);
    const rows = results[0].rows;
    if (rows.length > 0) {
      return rows.item(0);
    }
    return null;
  },
};
