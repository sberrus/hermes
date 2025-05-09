// imports
import { Router } from 'express';
// controllers
import { simplePing } from '@/controllers/ping.controller';

// router
export const pingRouter = Router()

pingRouter.get("/", simplePing)
