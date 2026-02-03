import { Application } from './app';
import { sequelize } from './config/sequelize.config';

const PORT = Number(process.env.PORT) || 3000;
const app = new Application(PORT, sequelize);

app.start();