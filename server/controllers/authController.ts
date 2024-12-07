import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: "Authentication failed", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const user = await AuthService.register(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // Invalidate token or manage session logout
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const newToken = await AuthService.refreshToken(refreshToken);
      res.status(200).json({ token: newToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: "Refresh token failed", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }
}