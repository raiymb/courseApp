import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";

export const getUserById = async (id: number): Promise<IUser | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOneBy({ id });
};

export const updateUser = async (id: number, updates: Partial<IUser>): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.update({ id }, updates);
  return getUserById(id) as Promise<IUser>;
};
