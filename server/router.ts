import express, { Request, Response } from 'express';
import * as DB from './controllers/DBController';
import * as Accommodation from './controllers/apiController';

const router = express.Router(); 

router.get('/mapMarkers', (req: Request, res: Response): void => {
  DB.getMarkers(req, res);
});

router.post('/mapMarkers', (req: Request, res: Response): void => {
  DB.addMarker(req, res);
})

router.put('/updateAllMarkers', (req: Request, res: Response): void => {
  DB.updateAllMarkers(req, res);
})

router.delete('/mapMarkers', (req: Request, res: Response): void => {
  DB.removeMarker(req, res);
})

router.post('/user', (req: Request, res: Response): void => {
  DB.addUser(req, res);
})

router.get('/user', (req: Request, res: Response): void => {
  DB.getUser(req, res);
})

router.get('/accommodation', (req: Request, res: Response): void => {
  DB.getAccommodation(req, res);
})

router.put('/accommodation', (req: Request, res: Response): void => {
  DB.addAccommodation(req, res);
})

router.get('/getAccommodation', (req: Request, res: Response): void => {
  Accommodation.getAccommodation(req, res);
});

router.get('/accommodationPic', (req: Request, res: Response): void => {
  Accommodation.getAccommodationPic(req, res);
});

router.get('/getAccommodationDetails', (req: Request, res: Response): void => {
  Accommodation.getAccommodationDetails(req, res);
});


export default router;