import express from 'express';
import webServices from './texel';
import cors from 'cors'; // default port to listen

export function start() {
  const app = express();
  const port = 6060;

  /**
   * Apply cors rules for developer frontend
   */
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );

  // define a route handler for the default home page
  app.use(webServices);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}
