import express from 'express';
import * as DB from './controllers/DBController';
import * as Accommodation from './controllers/apiController';
const router = express.Router();
router.get('/mapMarkers', (req, res) => {
    DB.getMarkers(req, res);
});
router.post('/mapMarkers', (req, res) => {
    DB.addMarker(req, res);
});
router.put('/updateAllMarkers', (req, res) => {
    DB.updateAllMarkers(req, res);
});
router.delete('/mapMarkers', (req, res) => {
    DB.removeMarker(req, res);
});
router.post('/user', (req, res) => {
    DB.addUser(req, res);
});
router.get('/user', (req, res) => {
    DB.getUser(req, res);
});
router.get('/accommodation', (req, res) => {
    DB.getAccommodation(req, res);
});
router.put('/accommodation', (req, res) => {
    DB.addAccommodation(req, res);
});
router.get('/getAccommodation', (req, res) => {
    Accommodation.getAccommodation(req, res);
});
router.get('/accommodationPic', (req, res) => {
    Accommodation.getAccommodationPic(req, res);
});
router.get('/getAccommodationDetails', (req, res) => {
    Accommodation.getAccommodationDetails(req, res);
});
export default router;
