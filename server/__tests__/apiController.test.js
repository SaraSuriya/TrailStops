const createServer = require('../server.js');
const mockingoose = require('mockingoose');
const router = require('../router.js');
const supertest = require('supertest');
const UserMarkers = require('../models/schema.js');
const {getAccommodationPic} = require('../controllers/apiController.js');
const apiKey = require('../controllers/apiController.js');
const request = supertest;

const mongoose = require('mongoose');
const databaseName = 'test';

const app = createServer();

const photoRef = require('./__mocks__/mocks.js');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); 
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('API Connection', () => {
  test('.env configuration should work and lead to valid API key', async () => {
      expect(apiKey).toBeDefined();
  })
});

describe('Integration tests', () => {

    beforeAll(async () => {
        await mongoose.disconnect();
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url);
    })

        afterEach(async () => {
        await mongoose.disconnect();
    })

    describe('API Response Result', () => {

      it('should return a valid image', async() => {
        const res = mockResponse();
        const req = {
          query: {
            photo_reference: `${photoRef}`
          }
        }
        await getAccommodationPic(req, res);
        // expect(response.body).toHaveProperty('data');
        // expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({data: expect.anything()}))

      });

  });

  describe('GET /accommodation', () => {

    // beforeAll(async() => {
    //     const mongoServer = await MongoMemoryServer.create();
    //     await mongoose.connect(mongoServer.getUri());
    // })

    // afterAll(async() => {
    //     await mongoose.disconnect();
    //     await mongoose.connection.close();
    // })

    // describe('receive accommodation info', () => {
    //     test('should return a 200 status code', async () => {
    //         const response = await request(app).get(`/accommodationPic?photo_reference=${photoRef}`)

    //         await supertest(app).get(`/accommodationPic?photo_reference=${photoRef}`).expect(200);
    //     })
    // })
})

    //     it('should save geographical markers to the database', async() => {

    //     const markers = {user_id: 'aidan@test.com', position: {lat: 56.046547415929844, lng: -4.400127729426957}, hotel: 'hotel', _id: '1234', nextDist: {dist: 1, time: 1}, prevDist: {dist: 2, time: 2}, order: 10, walkingSpeed: 3, distanceMeasure: 'km'};
        
    //     const response = await request.post('/mapMarkers', )
    //     .send(markers);
        
    //     const foundMarkers = await UserMarkers.findOne({position: markers.position});
    //     expect(foundMarkers.position).toBe(markers.position);
    // })

    // it('should return status 200 and the response object', async () => {
    //     const response = await request(router)
    //       .post('/mapMarkers')
    //       .send({
    //         _id: 1234,
    //         user_id: 'aidan@test.com',
    //         marker: { position: {lat: 56.046547415929844, lng: -4.400127729426957}, hotel: 'someHotel', nextDist: {dist: 1, time: 1}, prevDist: {dist: 2, time: 2}, order: 1 },
    //         updatedMarkers: { 'someKey': { prevDist: 3, nextDist: 3, order: 2 } },
    //         settings: { speed: 3, distance: 'km' }
    //       });
    
    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('_id');
    //   });
})


// try {
//     const _id = marker._id
//     const response = await fetch(`${BASE_URL}/mapMarkers`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({_id: _id, user_id: user_id, marker: marker, updatedMarkers: updatedMarkers, settings: settings}),
//   })
//   const data = await response.json();