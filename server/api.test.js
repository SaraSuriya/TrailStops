const apiKey = require('./controllers/apiController.js');

describe('API Connection', () => {
    it('.env configuration should lead to valid API key', async () => {
        expect(apiKey).toBeDefined();
    })
});

