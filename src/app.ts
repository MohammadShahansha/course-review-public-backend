import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { courseRouter } from './app/modules/course/course.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', courseRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
