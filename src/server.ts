// TODO: conditionally use https module instead of http when no TLS terminating forward-proxy is present
import { createServer } from 'http';
import { join as pathJoin } from 'path';
import express from 'express';

import router from './router';

// Read configuration from environment
const port = process.env.PORT !== undefined ? process.env.PORT : '3000';

// Verify required configuration is present
// if (requiredConfigKey === undefined) { throw new Error('Cannot start without requiredConfigKey'); }

// Initialize middleware
// ...

// Initialize HTTP server
const app = express();
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}
app.set('view engine', 'ejs');
app.use(express.static(pathJoin(__dirname, '../build/client')));

const server = createServer(app);

// HTTP routing
app.use(router);

// Start the server
server.listen(parseInt(port, 10), () => {
  console.log(`server listening on port ${port}`);
});

// TODO: graceful shutdown?
