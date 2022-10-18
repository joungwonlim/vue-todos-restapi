import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import middleware from './middlewars';

import api from './api';

/**
 * Envornomnet Variable
 */
dotenv.config();

/**
 * Connect Database
 */
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Successful connect databse');
  })
  .catch(error => {
    console.log(`Failed conenct database${error}`);
  });

/**
 * Express
 */
const app = express();

// middle ware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// router
app.get('/', (req, res) => {
  res.json({
    message: 'Hello index.js = 🎸🎸🎸🎸🎸',
  });
});

app.use('/api/v1', api);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
