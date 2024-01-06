import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

import { updateUser } from "@/services/user.service";
import { RootState } from "@/lib/store";
import { ICreateAndUpdateUser } from "@/consts/types/userTypes";
import { ICreateAndUpdatePost, IPost } from "@/consts/types/postTypes";
import {
  createPost,
  getPostById,
  getPostByTagName,
  getPostByUserId,
  getPostList,
  updatePost,
} from "@/services/posts.service";

export interface IPosts {
  data: IPost[];
  total: number;
  page: number;
  limit: number;
}

export interface IUserState {
  posts: IPosts | undefined;
  post: IPost | undefined;
  loading: boolean;
  success: boolean;
  postAdded: boolean;
  postUpdated: boolean;
  error: any;
}

const initialState: IUserState = {
  posts: undefined,
  post: undefined,
  loading: false,
  success: false,
  postAdded: false,
  postUpdated: false,
  error: "",
};

interface IParams {
  page?: number;
  limit?: number;
}
interface IByUserId {
  page?: number;
  limit?: number;
  id: string;
}

export const getPosts = createAsyncThunk(
  "posts/list",
  async (data: IParams, thunkAPI) => {
    try {
      const response = await getPostList({
        page: data.page || 0,
        limit: data.limit || 10,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPostsByUser = createAsyncThunk(
  "posts/listbyuser",
  async (data: IByUserId, thunkAPI) => {
    try {
      const response = await getPostByUserId({
        id: data.id,
        page: data.page || 0,
        limit: data.limit || 10,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPostsByTag = createAsyncThunk(
  "posts/listbytag",
  async (data: IByUserId, thunkAPI) => {
    try {
      const response = await getPostByTagName({
        id: data.id,
        page: data.page || 0,
        limit: data.limit || 10,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/create",
  async (data: ICreateAndUpdatePost, thunkAPI) => {
    try {
      const response = await createPost(data);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updatePostAction = createAsyncThunk(
  "posts/update",
  async (data: ICreateAndUpdatePost, thunkAPI) => {
    const id = data.id;
    const formdata = data;
    delete formdata.id;

    try {
      const response = await updatePost(formdata, id!);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePostById = createAsyncThunk(
  "posts/singlePost",
  async (id: string, thunkAPI) => {
    try {
      const response = await getPostById(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPostState = createAction("posts/reset");

const postsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getPosts.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (state.posts) {
        const allPosts = [...state.posts.data, ...action.payload.data];
        const data = { ...action.payload, data: allPosts };
        state.posts = data;
      } else {
        state.posts = action.payload;
      }
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getPostsByUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPostsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (state.posts) {
        const allPosts = [...state.posts.data, ...action.payload.data];
        const data = { ...action.payload, data: allPosts };
        state.posts = data;
      } else {
        state.posts = action.payload;
      }
    })
    .addCase(getPostsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getPostsByTag.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPostsByTag.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (state.posts) {
        const allPosts = [...state.posts.data, ...action.payload.data];
        const data = { ...action.payload, data: allPosts };
        state.posts = data;
      } else {
        state.posts = action.payload;
      }
    })
    .addCase(getPostsByTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getSinglePostById.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSinglePostById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.post = action.payload;
    })
    .addCase(getSinglePostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addPost.pending, (state) => {
      state.loading = true;
      state.postAdded = false;
    })
    .addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
      state.postAdded = true;
    })
    .addCase(addPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updatePostAction.pending, (state) => {
      state.loading = true;
      state.postUpdated = false;
    })
    .addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postUpdated = true;
    })
    .addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(resetPostState, (state) => {
      state.error = "";
      state.loading = false;
      state.success = false;
      state.post = undefined;
      state.posts = undefined;
      state.postAdded = false;
      state.postUpdated = false;
    });
});

export const postsList = (state: RootState) => state.posts;

export default postsReducer;
