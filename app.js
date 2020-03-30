import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connect } from 'mongoose';
import routes from './api/routes';

config();
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-Request-With, Authorization, Accept'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/api/v2', routes);
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  const error = new Error('Resources not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(
    port,
    console.log(`server is now running at http://localhost:${port}/api/v2`)
  );
});

export default app;
