import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Provider Month Avaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 28, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 5, 29, 15, 0, 0),
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'user_id',
      month: 6,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: false },
        { day: 29, available: true },
      ]),
    );
  });
});
