const supertest = require('supertest');
const mockingoose = require('mockingoose');
const createServer = require('../server.js');
const {User, UserMarkers} = require('../models/schema')
const {addUser, getUser, addMarker} = require('../controllers/DBController.js');
const request = supertest;
const router = require('../router.js')

const mongoose = require('mongoose')

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
            const res = mockResponse(); 
            const req = {
                body: { name: 'tester', email: 'tester@testing.com', password: 'test'},
              };
              mockingoose(User).toReturn(req.body, 'save');
              await addUser(req, res);

        })
      })

      describe('given invalid user credentials', () => {
        test('should not return any markers', async () => {

        })
        test('should respond with a 400 status code', () => {
            const res = mockResponse();

        })
      })
})

describe('POST /mapMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given valid marker data', () => {

          const mockMarker = {
            _id: "1234",
            position: { lat: 56.046547415929844, lng: -4.400127729426957 },
            hotel: "Some Hotel",
            nextDist: { dist: 6, time: 2 },
            prevDist: { dist: 3, time: 1 },
            order: 1
          };
          const mockUpdatedMarkers = {
            markerId1: {
              prevDist: { dist: 9, time: 3 },
              nextDist: { dist: 12, time: 4 },
              order: 2
            }
          };
          const mockSettings = {speed: 3, distance: "km"};
          const mockUserId = 'tester@test.com';

          fetchMock.mockResponseOnce(JSON.stringify({
            _id: mockMarker._id,
            user_id: mockUserId,
            position: mockMarker.position,
            hotel: mockMarker.hotel,
            nextDist: mockMarker.nextDist,
            prevDist: mockMarker.prevDist,
            order: mockMarker.order
          }));

          const req = {body: {
            _id: mockMarker._id,
            user_id: mockUserId,
            marker: mockMarker,
            updatedMarkers: mockUpdatedMarkers,
            settings: mockSettings
          }}

        test('should respond with a 200 status code', async () => {
            const res = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save');
            await addMarker(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        })
        test('should save the new marker to the database', async () => {
            const res = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
            await addMarker(req, res);
            mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
            const foundMarker = await UserMarkers.find({ _id: req.body._id });
            expect(foundMarker).toEqual(expect.objectContaining({
              _id: req.body._id,
            })); // should return an object containing the saved marker's id
        })
      })
})

describe('GET /mapMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given a valid user id', () => {
        test('should retrieve all associated markers from the database', async () => {

        })
      })

})

describe('DELETE /mapMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given a user id and marker id', () => {
        test('should remove the marker id from the database', async () => {

        })
      })

})

describe('PUT /updateAllMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given valid markers', () => {
        test('update markers in the database', async () => {

        })
      })

})


describe('PUT /accommodation', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given a marker id and accommodation', () => {
        test('should update user with selected accommodation', async () => {

        })
      })

})

describe('GET /accommodation', () => {
    beforeEach(() => {
        mockingoose.resetAll();
      });

      describe('given a valid marker', () => {
        test('should get related accommodation info', async () => {

        })
      })

})