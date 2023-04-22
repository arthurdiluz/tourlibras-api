import { Professor, Student } from '@prisma/client';

export default interface IUser {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  isEmailConfirmed: boolean;
  fullName: string;
  username: string;
  password5: string;
  profilePhoto: string;
  Professors: Array<Professor>; // TODO: update to interface
  Students: Array<Student>; // TODO: update to interface
}
