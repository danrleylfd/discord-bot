import mongoose from 'mongoose';

export type mongooseOptions = {
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export default function Connection(host: string, options: mongooseOptions|object) {
  return mongoose.connect(host, options);
}
