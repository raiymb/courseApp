import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (payload: object, expiresIn: string = "1h"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): object | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded;
    }
    return null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const decodeToken = (token: string): object | null => {
  try {
    const decoded = jwt.decode(token);
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded;
    }
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
