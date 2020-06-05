import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentidated';

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
appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointement = container.resolve(CreateAppointmentService);

  const appointment = await createAppointement.execute({
    provider_id,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
