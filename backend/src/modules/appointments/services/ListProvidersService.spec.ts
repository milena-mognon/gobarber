import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers, except the logged', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'Provider 1',
      email: 'provider1@mail.com',
      password: '123456',
    });
    const provider2 = await fakeUsersRepository.create({
      name: 'Provider 2',
      email: 'provider2@mail.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Provider 3',
      email: 'provider3@mail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
    // different ways of the same test.
    expect(providers).not.toContain(loggedUser);
  });
});
