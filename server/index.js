const port = 3001;
const cors = require('cors');
const createServer = require('./server');

const app = createServer();
app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})