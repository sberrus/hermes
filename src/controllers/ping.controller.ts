import { Request, Response } from 'express';

// GET
/**
 * Response with a simple ping
 */
const simplePing = (req: Request, res: Response) => {
    res.json({ msg: "ping" })
}

export { simplePing }
