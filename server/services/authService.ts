import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hashing";
import { generateToken, verifyToken } from "../utils/jwt";
import { IUser } from "../interfaces/IUser";

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    return generateToken({ id: user.id, role: user.role });
  }

  static async register(userData: Partial<IUser>): Promise<IUser> {
    const userRepository = AppDataSource.getRepository(User);
    userData.password = await hashPassword(userData.password as string);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  static async refreshToken(refreshToken: string): Promise<string> {
    const decoded: any = verifyToken(refreshToken);
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      throw new Error("Invalid refresh token");
    }
    return generateToken({ id: decoded.id, role: decoded.role });
  }
}