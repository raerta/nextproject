export interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  picture: string;
  title: string;
}

export interface ICreateAndUpdateUser {
  firstName: string;
  lastName: string;
  email?: string;
  id?: string;
}

export interface IUserDetail {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  registerDate: string;
  updatedDate: string;
}
