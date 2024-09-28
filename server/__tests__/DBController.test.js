const supertest = require('supertest');
const mockingoose = require('mockingoose');
const createServer = require('../server.js');
const {User, UserMarkers} = require('../models/schema')
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
        test('should save user to the database', async() => {
            const res = mockResponse(); 
            mockingoose(User).toReturn(req.body, 'save');
            await addUser(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              }));
        });
        test('should not save user if the email already exists', async() => {
            const res = mockResponse();
            mockingoose(User).toReturn(req.body, 'findOne'); // Mock findOne and simulate existing user
            await addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });

            mockingoose(User).toReturn(req.body, 'save'); // Ensure that save is not called again
            await addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User with this email already exists' });
      });
        
    })

    describe('given no name, email, or password', () => {
        const req = { body: {} };
        test('should respond with a 400 status code', async () => {
            const res = mockResponse();
            await addUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        test('should not save anything to the database', async () => {
            const res = mockResponse();
            mockingoose(User).toReturn(req.body, 'save');
            await addUser(req, res);
            expect(res.json).not.toHaveBeenCalledWith(expect.objectContaining({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }));
        });
    })
})

describe('GET /user', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given valid user credentials', () => {
        test('should access all associated markers', async () => {

        })
      })

      describe('given invalid user credentials', () => {
        
      })
})