import { IUser } from "../interfaces/IUser";
import { hashPassword, comparePassword } from "../utils/hashing";
import { generateToken } from "../utils/jwt";
import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import { getRepository } from "typeorm";

export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const hashedPassword = await hashPassword(userData.password!);
  const newUser = userRepository.create({ ...userData, password: hashedPassword });
  return userRepository.save(newUser);
};
export const loginUser = async (email: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);

  // Check if user with this email exists
  console.log("Trying to login with email:", email);
  
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    console.error("User not found");
    throw new Error("Invalid email or password");
  }

  // Log to check if user data was fetched correctly
  console.log("Found user:", user);

  // Check if the password matches the hash
  const isPasswordValid = await comparePassword(password, user.password);
  
  // Log the password comparison result
  console.log("Password valid:", isPasswordValid);

  if (!isPasswordValid) {
    console.error("Invalid password");
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken({ id: user.id, role: user.role });

  // Return both user and token
  console.log("Login successful, generating token");
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    token,
  };
};
