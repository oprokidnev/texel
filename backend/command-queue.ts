import Queue from 'bull';

const commandQueue = new Queue('process-command', {
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASS,
  },
});

export default commandQueue;
