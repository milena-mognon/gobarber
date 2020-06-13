import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/implementations/DiskStorageProviver';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
