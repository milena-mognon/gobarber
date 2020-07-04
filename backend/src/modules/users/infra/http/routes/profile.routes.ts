import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ProfileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      old_password: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  ProfileController.update,
);

export default profileRouter;
