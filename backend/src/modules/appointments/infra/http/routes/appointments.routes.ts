import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsService from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/**
 * no need to add /appointments, it's already defined in routes.ts
 * Ex: '/' == '/appointments'
 */
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  AppointmentsController.create,
);

appointmentsRouter.get('/me', ProviderAppointmentsService.index);

export default appointmentsRouter;
