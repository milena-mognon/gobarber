import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

/**
 * no need to add /appointments, it's already defined in routes.ts
 * Ex: '/' == '/appointments'
 */
appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
