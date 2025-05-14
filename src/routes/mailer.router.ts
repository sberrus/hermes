// imports
import { Router } from "express";
// controllers
import { sendSimpleEmail } from "@/controllers/mailer.controller";

// router
export const mailerRouter = Router();

mailerRouter.get("/send-email", sendSimpleEmail);
