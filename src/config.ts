export class Config {
  public endpoint: string;
  constructor(env: any) {
    this.endpoint = env.REACT_APP_BACKEND_ENDPOINT;
  }

  getEndpoint() {
    return this.endpoint;
  }
}

const config = new Config(process.env);

export default config;
