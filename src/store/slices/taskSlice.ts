import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../components/RenderItemCard';
import { DB } from '../../Database/database';

export const loadTasks = createAsyncThunk('tasks/load', async () => {
  await DB.init();
  return DB.getAllTasks();
});

export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (task: Task) => {
    await DB.insertTask(task);
    return task;
  },
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    await DB.updateTask(task);
    return task;
  },
);

export const removeTaskAsync = createAsyncThunk(
  'tasks/removeTask',
  async (id: string) => {
    await DB.deleteTask(id);
    return id;
  },
);

type TaskState = {
  tasks: Task[];
  loading: boolean;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTasks.pending, state => {
        state.loading = true;
      })
      .addCase(loadTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload.map(item => ({
          ...item,
          status:
            item.dueDate && new Date(item.dueDate) < new Date()
              ? 'overdue'
              : item.status,
        }));
        state.loading = false;
      })
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks=[action.payload,...state.tasks];
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.tasks = state.tasks.map(item => {
            const updatedItem =
              item.id === action.payload.id
                ? { ...item, ...action.payload }
                : item;
            return {
              ...updatedItem,
              status:
                updatedItem.dueDate &&
                new Date(updatedItem.dueDate) < new Date()
                  ? 'overdue'
                  : updatedItem.status,
            };
          });
        },
      )
      .addCase(
        removeTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
      );
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
