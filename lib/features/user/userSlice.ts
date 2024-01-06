import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

import {
  createUser,
  getUserById,
  getUserList,
  updateUser,
} from "@/services/user.service";
import { RootState } from "@/lib/store";
import {
  ICreateAndUpdateUser,
  IUser,
  IUserDetail,
} from "@/consts/types/userTypes";

interface IUsers {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
}

export interface IUserState {
  users: IUsers | undefined;
  user: IUserDetail | undefined;
  loading: boolean;
  success: boolean;
  userUpdated: boolean;
  userAdded: boolean;
  error: any;
}

const initialState: IUserState = {
  users: undefined,
  user: undefined,
  loading: false,
  success: false,
  userUpdated: false,
  userAdded: false,
  error: "",
};

interface IParams {
  page?: number;
  limit?: number;
}

export const getUsers = createAsyncThunk(
  "users/list",
  async (data: IParams, thunkAPI) => {
    try {
      const response = await getUserList({
        page: data.page || 0,
        limit: data.limit || 10,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addUser = createAsyncThunk(
  "users/create",
  async (data: ICreateAndUpdateUser, thunkAPI) => {
    try {
      const response = await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateUsers = createAsyncThunk(
  "users/update",
  async (data: ICreateAndUpdateUser, thunkAPI) => {
    try {
      const response = await updateUser(
        {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        data.id!
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSingleUserById = createAsyncThunk(
  "users/singleUser",
  async (id: string, thunkAPI) => {
    try {
      const response = await getUserById(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetState = createAction("users/reset");

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getSingleUserById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSingleUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    })
    .addCase(getSingleUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.userAdded = true;
    })
    .addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.userUpdated = true;
    })
    .addCase(updateUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(resetState, (state) => {
      state.error = "";
      state.loading = false;
      state.success = false;
      state.userUpdated = false;
      state.userAdded = false;
    });
});

export const usersList = (state: RootState) => state.users;

export default usersReducer;
