import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', ProvidersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      month: Joi.string().regex(RegExp('^([1-9]|1[012])$')).required(),
      year: Joi.string().regex(RegExp('^(20[2-9][0-9])$')).required(),
    },
  }),
  ProviderMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      day: Joi.string().regex(RegExp('^([1-9]|[12][0-9]|3[01])$')).required(),
      month: Joi.string().regex(RegExp('^([1-9]|1[012])$')).required(),
      year: Joi.string().regex(RegExp('^(20[2-9][0-9])$')).required(),
    },
  }),
  ProviderDayAvailabilityController.index,
);

export default providersRouter;
