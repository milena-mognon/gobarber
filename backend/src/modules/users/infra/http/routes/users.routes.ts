import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create,
);

// patch é usado para alterar uma única informação. Put é usado para várias.
// upload.single -> informa que será feito upload de um único arquivo e 'avatar é o nome do campo'
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default usersRouter;
