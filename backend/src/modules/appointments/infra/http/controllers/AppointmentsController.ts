import { Request, Response, request } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = request.user.id;

    const parsedDate = parseISO(date);

    const createAppointement = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointement.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}

export default new AppointmentsController();
