import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListProviderDayAvailabilityService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 6, 30, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 6, 30, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 6, 30, 15, 0, 0),
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'user_id',
      month: 7,
      year: 2020,
      day: 30,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: true },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 15, available: false },
      ]),
    );
  });

  it('should not be able to list the day availability if the date/hour already passed', async () => {
    /**
     * Creating 2 appointments after 20/05/2020 12h
     */
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user_id',
      user_id: 'user_id_2',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    /**
     * This part configure the date to be 20/05/2020 12h
     */
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 12).getTime();
    });

    /**
     * Find the available hours
     */
    const availability = await listDayAvailability.execute({
      provider_id: 'user_id',
      month: 5,
      year: 2020,
      day: 20,
    });

    /**
     * Verify if the already past date/hour is not available
     */
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 16, available: true },
        { hour: 17, available: false },
      ]),
    );
  });
});
