import { container } from 'tsyringe';

import IHashProvider from './HashProviver/models/IHashProvider';
import BCryptHashProvider from './HashProviver/implementations/BCryptHashProvider';

/**
 * When inject a dependency called 'HashProvider', an instance of BCryptHashProvider
 * will be returned
 */
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
