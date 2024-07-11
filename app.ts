
import express, { Request, Response } from 'express'; 
import env from 'dotenv';
import { getLogger } from './services/LoggerService';
  
env.config();
const app = express(); 
const PORT = process.env.PORT;
const logger = getLogger();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, (error) => { 
    if(!error) 
        logger.info(`Server is Successfully Running, and App is listening on port: ${PORT}`) 
    else 
        logger.emerg(`Error occurred, server can't start ${error}`); 
    } 
); 


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
  });