import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProviver';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
