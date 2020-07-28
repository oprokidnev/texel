import Redis from "redis";
import { promisify } from "util";

export class RedisClient {
  private client = Redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
  });
  public get = promisify(this.client.get)
    .bind(this.client);
  public set = promisify(this.client.set)
    .bind(this.client);
}
