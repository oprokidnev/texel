import { exec } from 'child_process';
import serviceConfig from './config.json';
import { WebService } from '../src/services/interfaces';
import { promisify } from 'util';
import { fromPairs } from 'lodash';
import commandQueue from './command-queue';

const execAsync = promisify(exec);

export const start = () => {
  commandQueue.process(async (job, done) => {
    const { params } = job.data;
    const commands = (serviceConfig as WebService).commands;

    const result = fromPairs(
      await Promise.all(
        Object.entries(commands).map(async ([k, c]) => {
          // eslint-disable-next-line no-new-func
          const mappedCommand = new Function(...Object.keys(params), 'return `' + c + '`;')(
            ...Object.values(params)
          );
          const result = await execAsync(mappedCommand);

          return [k, result.stdout];
        })
      )
    );

    done(null, result);
  });
};
