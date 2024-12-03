import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { IRequest } from "../interfaces/IRequest";

export const authMiddleware = (req: IRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    res.status(401).json({ message: "Authentication token is missing" });
    return;
  }

  try {
    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    req.user = payload as any; // Attach user to the request
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
