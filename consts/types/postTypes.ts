import { IUser } from "./userTypes";

export interface IPost {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: IUser;
  link?: string;
}

export interface ICreateAndUpdatePost {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner?: string;
  id?: string;
  link?: string;
}
