import { ICreateAndUpdatePost } from "@/consts/types/postTypes";
import apiClient from "@/utils/request";

export const getPostList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<any> => {
  const response = (await apiClient.get(`/post?page=${page}&limit=${limit}`))
    .data;
  return response;
};

export const getPostById = async (id: string): Promise<any> => {
  const response = (await apiClient.get(`/post/${id}`)).data;
  return response;
};
export const getPostByUserId = async ({
  id,
  page,
  limit,
}: {
  id: string;
  page: number;
  limit: number;
}): Promise<any> => {
  const response = (
    await apiClient.get(`/user/${id}/post?page=${page}&limit=${limit}`)
  ).data;
  return response;
};

export const getPostByTagName = async ({
  id,
  page,
  limit,
}: {
  id: string;
  page: number;
  limit: number;
}): Promise<any> => {
  const response = (
    await apiClient.get(`/tag/${id}/post?page=${page}&limit=${limit}`)
  ).data;
  return response;
};

export const deletePost = async (id: string): Promise<any> => {
  const response = (await apiClient.delete(`/post/${id}`)).data;
  return response;
};

export const createPost = async (data: ICreateAndUpdatePost): Promise<any> => {
  const response = await apiClient.post("/post/create", data);
  return response.data;
};

export const updatePost = async (
  data: ICreateAndUpdatePost,
  id: string
): Promise<any> => {
  const response = await apiClient.put(`/post/${id}`, data);
  return response.data;
};
