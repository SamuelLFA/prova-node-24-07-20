import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import settings from './config/settings';

const app = express();
const port = settings.port || 3000;

app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Running in port ${port}`);
});

app.use(router);
