import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsService from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/**
 * no need to add /appointments, it's already defined in routes.ts
 * Ex: '/' == '/appointments'
 */
appointmentsRouter.post('/', AppointmentsController.create);
appointmentsRouter.get('/me', ProviderAppointmentsService.index);

export default appointmentsRouter;
