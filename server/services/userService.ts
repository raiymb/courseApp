import { IUser } from "../interfaces/IUser";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";

export class UserService {
  static async getAllUsers(): Promise<IUser[]> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  }

  static async getUserById(userId: number): Promise<IUser | null> {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({ where: { id: userId } });
  }

  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  static async updateUser(userId: number, updateData: Partial<IUser>): Promise<IUser | null> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) return null;

    Object.assign(user, updateData);
    return await userRepository.save(user);
  }

  static async deleteUser(userId: number): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete(userId);
  }
}