const supertest = require('supertest');
const mockingoose = require('mockingoose');
const createServer = require('../server.js');
const User = require('../models/schema')
const photoRef = require('../__mocks__/mocks.js');
const {addUser} = require('../controllers/DBController.js');
const request = supertest;
const router = require('../router.js')

const mongoose = require('mongoose')

const databaseName = 'test';

const app = createServer();

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); 
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };


describe('POST /user', () => {

    beforeEach(() => {
        mockingoose.resetAll();
      });

    describe('given a name, email, and password', () => {

        const req = {
            body: {
              name: 'tester',
              email: 'tester@testing.com',
              password: 'test',
            },
          };
 
        test('should respond with a 200 status code', async() => {
              const res = mockResponse(); 
              await addUser(req, res);
              expect(res.status).toHaveBeenCalledWith(200);
        });

        test('should save user details to the database', async() => {
              const res = mockResponse(); 
              mockingoose(User).toReturn(req.body, 'save');
              await addUser(req, res);
              expect(res.json).toHaveBeenCalledWith(req.body);
        });
        
    })

    describe('when the email is not a valid format', () => {
        // it should not save the user's details to the database
        // it should respond with a 400 status code
    })

    describe('given no name, email, or password', () => {

        test('should respond with a 400 status code', async () => {
            const req = { body: {} }; 
            const res = mockResponse();

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    })
})