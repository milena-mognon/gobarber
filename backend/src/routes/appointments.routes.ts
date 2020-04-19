import { Router } from 'express';
import { parseISO } from 'date-fns';
const appointmentsRouter = Router();

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRepository = new AppointmentsRepository();

/**
 * no need to add /appointments, it's already defined in routes.ts
 * Ex: '/' == '/appointments'
 */
appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointement = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointement.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

export default appointmentsRouter;
