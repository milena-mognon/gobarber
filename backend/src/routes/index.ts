import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

/**
 * all routes (get, post, put, delete) will be forward to appointmentsRouter
 */
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
