import { Request, Response } from "express";
import { getUserById, updateUser } from "../services/userService";
import { IRequest } from "../interfaces/IRequest";

export const getUserProfile = async (req: IRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(400).json({ message: "User ID is missing" });
      return;
    }

    const user = await getUserById(req.user.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const updateUserProfile = async (req: IRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(400).json({ message: "User ID is missing" });
      return;
    }

    const updatedUser = await updateUser(req.user.id, req.body);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};
