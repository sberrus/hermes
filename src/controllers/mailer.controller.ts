import { Request, Response } from 'express';

// GET
/**
 * Response with a simple ping
 */
export const sendSimpleEmail = (req: Request, res: Response) => {
    res.json({ msg: "email sent!" })
}

