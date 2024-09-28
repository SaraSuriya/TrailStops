const supertest = require('supertest');
const mockingoose = require('mockingoose');
const createServer = require('../server.js');
const photoRef = require('./__mocks__/mocks.js');
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

    describe('given a new name, email, and password', () => {
        // it should save the user's details to the database

        test('should respond with a 200 status code', async() => {
            const req = {
                body: {
                  name: 'tester',
                  email: 'tester@testing.com',
                  password: 'test',
                },
              };
              const res = mockResponse(); 
              await addUser(req, res);
              expect(res.status).toHaveBeenCalledWith(200);
        });
        
    })

    describe('when the email is not a valid format', () => {
        // it should not save the user's details to the database
        // it should respond with a 400 status code
    })

    describe('when the username and password fields are missing', () => {

        test('should respond with a 400 status code', async () => {
            const req = { body: {} }; 
            const res = mockResponse();

            await addUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    })
})