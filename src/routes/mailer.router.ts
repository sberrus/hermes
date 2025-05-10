// imports
import { Router } from 'express';
// controllers
import { sendSimpleEmail } from '@/controllers/mailer.controller';

// router
export const mailerRouter = Router()

mailerRouter.get("/", (req, res, next) => {
    console.log("Driving through from middleware")
    next()
}, sendSimpleEmail)
