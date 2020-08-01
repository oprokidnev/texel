import { Router } from 'express';
import cors from 'cors';
import serviceConfig from './config.json';
import { Command } from './database';
import bodyParser from 'body-parser';
import commandQueue from './command-queue';
const webServices = Router();

webServices.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
webServices.use(bodyParser.json());

webServices.route('/config').get(async (req, res) => {
  return res.json(serviceConfig);
});

webServices.route('/run').post(async (req, res) => {
  const data: Object = req.body;
  const commandRecord = await Command.create<{
    createdAt?: Date;
    updatedAt?: Date;
    params: Object;
  }>({
    params: data,
  });
  const result = await commandQueue.add(commandRecord);
  const finalResult = await result.finished();

  commandRecord.updatedAt = new Date();
  commandRecord.output = finalResult;
  await commandRecord.save();

  return res.json(commandRecord);
});

export default webServices;
