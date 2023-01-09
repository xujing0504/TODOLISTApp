import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../Utils/Task";
import { apiCall } from "../Utils/apiCall";
import { API_URL } from "react-native-dotenv";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const { status, data } = await apiCall.get(`${API_URL}/tasks`);
  switch (status) {
    case 200:
      return { message: "Fetch TasksList success", data };
    case 204:
      return { message: "Fetch TasksList empty", data: [] };
    default:
      return { message: "Fetch TasksList failed: Something went wrong" };
  }
});

export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  const { status } = await apiCall.post(`${API_URL}/tasks`, task);
  switch (status) {
    case 201:
      return { message: "Create success", task };
    case 409:
      return { message: `Create failed: ${task.label} already exist` };
    default:
      return { message: "Create failed: Something went wrong" };
  }
});

export const fetchATask = createAsyncThunk("tasks/fetchTask", async (title) => {
  const { status, data } = await apiCall.get(`${API_URL}/tasks/${title}`);
  switch (status) {
    case 200:
      return { message: "Fetch task success", data };
    case 201:
      return { message: `Fetch task failed ${task.label} has not content` };
    case 409:
      return { message: `Create failed: ${task.label} already exist` };
    default:
      return { message: "Create failed: Something went wrong" };
  }
});

export const updateTaskByTitle = createAsyncThunk(
  "tasks/updateTask",
  async (title) => {
    const endDate = new Date();
    const { status } = await apiCall.put(`${API_URL}/tasks/${title}`, {
      end_date: endDate,
    });
    switch (status) {
      case 200:
        return { message: "Updated success", title, endDate };
      case 404:
        return { message: `Updated failed: ${title} not found` };
      default:
        return { message: "Updated failed: Something went wrong" };
    }
  }
);

export const deleteTaskByTitle = createAsyncThunk(
  "tasks/deleteTask",
  async (title) => {
    const { status } = await apiCall.delete(`${API_URL}/tasks/${title}`);
    switch (status) {
      case 200:
        return { message: "Delete success", title };
      case 404:
        return { message: `Delete failed: ${title} not found` };
      default:
        return { message: "Delete failed: Something went wrong" };
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { message, data } = action.payload;
        if (data && data.length !== 0) {
          const transData = data.map(
            (item) =>
              new Task({
                title: item.label,
                description: item.description,
                startDate: item.start_date,
                endDate: item.end_date,
              })
          );
          state.tasks = transData;
        }
        state.status = message;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addNewTask.fulfilled, (state, action) => {
        const { message, task } = action.payload;
        if (task) {
          state.tasks.push(
            new Task({
              title: task.label,
              description: task.description,
              startDate: task.start_date,
            })
          );
        }
        state.status = message;
      })
      .addCase(updateTaskByTitle.fulfilled, (state, action) => {
        const { message, title, endDate } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task.title === title);
        if (taskIndex !== -1) {
          const newList = [...state.tasks];
          const updatedTask = newList[taskIndex];
          updatedTask.endDate = new Date(endDate);
          newList.splice(taskIndex, 1, updatedTask);
          state.tasks = [...newList];
        }
        state.status = message;
      })
      .addCase(deleteTaskByTitle.fulfilled, (state, action) => {
        const { message, title } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task.title === title);
        if (taskIndex !== -1) {
          state.tasks.splice(taskIndex, 1);
        }
        state.status = message;
      });
  },
});

export default tasksSlice.reducer;

export const selectAllTasks = (state) => state.tasks;
export const getStatus = (state) => state.status;

export const getTaskByTitle = (state, title) =>
  state.tasks.find((task) => task.title === title);
