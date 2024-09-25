import { MongoClient } from 'mongodb';
import { CONF } from '../../conf/conf';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = CONF.MONGO_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (CONF.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
