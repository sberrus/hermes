import { verifyToken } from "@/lib/tokenManager.lib";
import { NextFunction, Request, Response } from "express";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token
    // validate token
    if (!token) {
        res.status(403).json({ message: "Token is required" })
        return
    }

    // validate jwt token 
    const validate = verifyToken(token as string)
    if (!validate) {
        res.status(401).json({
            message: "The token is not valid"
        })
        return
    }
    next()
}