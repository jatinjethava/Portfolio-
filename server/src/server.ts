import { app } from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`⚡ MERN Production API Server running on port ${PORT} [${config.env}]`);
});
