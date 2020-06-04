import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  filename: string;
}
export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ user_id, filename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior

      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}
