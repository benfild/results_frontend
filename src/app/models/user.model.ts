export interface User {
  _id: string;
  name: string;
  email: string;
  profile_pic: string;
  role: string;
  accessToken: string;
  expiresIn: number;
}
