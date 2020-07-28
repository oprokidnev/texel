import express from "express";
import webServices from './web-services/index';
import cors from 'cors';

const app = express();
const port = 6060; // default port to listen

/**
 * Apply cors rules for developer frontend
 */
app.use(
  cors({
    origin: 'http://localhost:3000'
  }),
);

// define a route handler for the default home page
app.use(webServices);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
