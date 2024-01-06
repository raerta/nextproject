import { deletePost } from "@/services/posts.service";
import { deleteUser } from "@/services/user.service";
import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";

export interface IModalState {
  modalIsOpen: boolean;
  modalText: string;
  modalType: string;
  loading: boolean;
  success: boolean;
  data: any;
  error: any;
}

const initialState: IModalState = {
  modalIsOpen: false,
  modalText: "",
  modalType: "",
  loading: false,
  data: "",
  error: "",
  success: false,
};

export const deleteUserById = createAsyncThunk(
  "users/deleteuser",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletePostById = createAsyncThunk(
  "users/deletePost",
  async (id: string, thunkAPI) => {
    try {
      const response = await deletePost(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteUserById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.modalIsOpen = false;
      state.modalText = "";
      state.modalType = "";
      state.data = "";
    })
    .addCase(deleteUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.modalIsOpen = false;
      state.modalText = "";
      state.modalType = "";
      state.data = "";
    })
    .addCase(deletePostById.pending, (state) => {
      state.loading = true;
      state.success = false;
    })
    .addCase(deletePostById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.modalIsOpen = false;
      state.modalText = "";
      state.modalType = "";
      state.data = "";
    })
    .addCase(deletePostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.modalIsOpen = false;
      state.modalText = "";
      state.modalType = "";
      state.data = "";
    });
});

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalIsOpen = true;
      state.modalText = action.payload.modalText;
      state.modalType = action.payload.modalType;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
      state.modalText = "";
      state.modalType = "";
      state.data = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalReducer;
