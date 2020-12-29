import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

const { config } = dotenv;
config();

const app = express();
const { urlencoded, json } = express;

const useCors = cors();
app.options('*', useCors);
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
