import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointement = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointement.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}

export default new AppointmentsController();
