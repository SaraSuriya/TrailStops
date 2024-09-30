import express from 'express';
import router from './router';
function createServer() {
    const app = express();
    app.use(express.json());
    app.use('/', router);
    return app;
}
// Server creation can be called as a function
// Export the createServer function
export default createServer;
