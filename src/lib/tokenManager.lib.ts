import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const SECRET = process.env.JWT_SECRET || 'changeme';

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}
