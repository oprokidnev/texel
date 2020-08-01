import { start as startWorker } from './worker';
import { start as startHttpServer } from './http';

startWorker();
startHttpServer();
