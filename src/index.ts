import express, { Request, Response } from 'express'
import routes from './api/routes'
import logger from './api/middleware/logger.middleware';

const app = express();
const port = 3000;

app.use(logger);
app.use('/api/', routes);

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World');
// });



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});