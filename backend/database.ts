import Mongoose, { Schema, model, Document } from 'mongoose';

export const Connection = Mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo/admin`,
  {
    useNewUrlParser: true,
    reconnectTries: 10,
  }
);

interface ICommand extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  output?: string;
  params: Object;
}

export const Command = model<ICommand>(
  'Command',
  new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    output: { type: Object, default: null },
    params: Object,
  })
);

export default {
  Connection,
};
