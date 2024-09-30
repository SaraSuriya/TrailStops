import cors from 'cors';
import createServer from './server';
const port = 3001;
const app = createServer();
app.use(cors());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
