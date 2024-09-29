import express from 'express';
import cors from 'cors';
import createServer from './server'; 

const port: number = 3001;
const app: express.Application = createServer(); 

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})