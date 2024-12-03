import { Response, NextFunction } from "express";
import { IRequest } from "../interfaces/IRequest";

export const roleMiddleware = (roles: string[] = []) => {
  return (req: IRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(403).json({ message: "Access forbidden: user not authenticated" });
      return;
    }

    if (roles.length && !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Access forbidden: insufficient permissions" });
      return;
    }

    next();
  };
};
