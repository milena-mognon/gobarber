import { Router } from 'express';
import AuthenticateService from '../service/AuthenticateService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const auth = new AuthenticateService();

  const { user, token } = await auth.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
