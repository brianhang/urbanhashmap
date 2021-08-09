import { Sequelize } from 'sequelize-typescript';
import dbconfig from '../dbconfig.json';
import path from 'path';

async function init() {
  const modelsPath = path.join(__dirname, 'models');
  const {host, database, username, password} = dbconfig;
  const sequelize = new Sequelize(
    `postgres://${username}:${password}@${host}/${database}`,
    {
      models: [modelsPath],
    }
  );
  try {
    await sequelize.sync();
    console.info('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  init,
};
