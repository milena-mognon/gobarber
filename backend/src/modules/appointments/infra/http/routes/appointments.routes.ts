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

appointmentsRouter.get(
  '/me',
  celebrate({
    [Segments.QUERY]: {
      day: Joi.string().regex(RegExp('^([1-9]|[12][0-9]|3[01])$')).required(),
      month: Joi.string().regex(RegExp('^([1-9]|1[012])$')).required(),
      year: Joi.string().regex(RegExp('^(20[2-9][0-9])$')).required(),
    },
  }),
  ProviderAppointmentsService.index,
);

export default appointmentsRouter;
