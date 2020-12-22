import { container } from 'tsyringe';

import { UUIdV4Provider } from './UUIdProvider/implementations/UUIdV4Provider';
import { IUUIdProvider } from './UUIdProvider/models/IUUIdProvider';

container.registerSingleton<IUUIdProvider>('UUIdV4Provider', UUIdV4Provider);
