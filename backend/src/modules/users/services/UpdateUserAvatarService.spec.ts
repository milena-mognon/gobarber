import FakeStorageProvider from '@shared/container/providers/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update user avatar', () => {
  it('shoud be able to update the user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('shoud not be able to update the user avatar if user do not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to delete the avatar if already exist and save a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'new-avatar.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('new-avatar.png');
  });
});
