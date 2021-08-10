import path from 'path';
import { Sequelize } from 'sequelize-typescript';

async function init() {
  const modelsPath = path.join(__dirname, 'models');
  const dbURL = process.env.DB_URL;
  if (dbURL == null) {
    throw new Error('DB_URL environment variable needs to be defined');
  }
  const sequelize = new Sequelize(dbURL, {
    models: [modelsPath],
  });
  try {
    await sequelize.sync();
    console.info('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    sequelize.close();
  }
}

export {
  init,
};
