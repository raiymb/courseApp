import { IUser } from "./IUser";
import { Request } from "express";

export interface IRequest extends Request {
  user?: IUser; // Authenticated user (added by auth middleware)
}
