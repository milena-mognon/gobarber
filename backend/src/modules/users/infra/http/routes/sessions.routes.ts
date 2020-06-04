import { Router } from 'express';
import AuthenticateService from '@modules/users/services/AuthenticateService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();

  const { email, password } = req.body;

  const auth = new AuthenticateService(usersRepository);

  const { user, token } = await auth.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
