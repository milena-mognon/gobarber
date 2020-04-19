import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

/**
 * all routes (get, post, put, delete) will be forward to appointmentsRouter
 */
routes.use('/appointments', appointmentsRouter);

export default routes;
