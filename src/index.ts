import express, { Request, Response } from 'express'
import routes from './api/routes'
import logger from './api/middleware/logger.middleware';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(logger);
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/', routes);

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World');
// });



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});