var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mockingoose from 'mockingoose';
import { UserMarkers } from '../models/schema';
import { addMarker } from '../controllers/DBController';
import fetchMock from 'jest-fetch-mock';
const mockResponse = () => {
    const res = {}; // Use Partial to allow optional properties
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};
// Use Partial for optional properties
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
        const mockSettings = { speed: 3, distance: "km" };
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
        const req = { body: {
                _id: mockMarker._id,
                user_id: mockUserId,
                marker: mockMarker,
                updatedMarkers: mockUpdatedMarkers,
                settings: mockSettings
            } };
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save');
            yield addMarker(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        }));
        test('should save the new marker to the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = mockResponse();
            mockingoose(UserMarkers).toReturn(req.body, 'save'); // mock save the marker
            yield addMarker(req, res);
            mockingoose(UserMarkers).toReturn(req.body, 'find'); // find the mock marker
            const foundMarker = yield UserMarkers.find({ _id: req.body._id });
            expect(foundMarker).toEqual(expect.objectContaining({
                _id: req.body._id,
            })); // should return an object containing the saved marker's id
        }));
    });
});
describe('GET /mapMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given a valid user id', () => {
        test('should retrieve all associated markers from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
});
describe('DELETE /mapMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given a user id and marker id', () => {
        test('should remove the marker id from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
});
describe('PUT /updateAllMarkers', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given valid markers', () => {
        test('update markers in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
});
describe('PUT /accommodation', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given a marker id and accommodation', () => {
        test('should update user with selected accommodation', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
});
describe('GET /accommodation', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });
    describe('given a valid marker', () => {
        test('should get related accommodation info', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
});
