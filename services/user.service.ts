import { ICreateAndUpdateUser, IUser } from "@/consts/types/userTypes";
import apiClient from "@/utils/request";

export const getUserList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<any> => {
  const response = (await apiClient.get(`/user?page=${page}&limit=${limit}`))
    .data;
  return response;
};
export const getUserById = async (id: string): Promise<any> => {
  const response = (await apiClient.get(`/user/${id}`)).data;
  return response;
};

export const createUser = async (data: ICreateAndUpdateUser): Promise<any> => {
  const response = await apiClient.post("/user/create", data);
  return response.data;
};
export const updateUser = async (
  data: ICreateAndUpdateUser,
  id: string
): Promise<any> => {
  const response = await apiClient.put(`/user/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<any> => {
  const response = (await apiClient.delete(`/user/${id}`)).data;
  return response;
};
