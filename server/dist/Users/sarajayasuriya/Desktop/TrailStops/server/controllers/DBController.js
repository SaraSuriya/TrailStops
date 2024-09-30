var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User, UserMarkers } from '../models/schema';
export const getMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.query;
        const response = yield UserMarkers.find({ user_id: user_id });
        const positions = response.map((marker) => marker);
        res.status(200).json(positions);
    }
    catch (error) {
        res.status(500).send(`Server Error0: ${error}`);
    }
});
export const addMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response;
        const { _id, user_id, marker, updatedMarkers, settings } = req.body;
        const newMarker = new UserMarkers({
            user_id: user_id,
            position: marker.position,
            hotel: marker.hotel,
            _id: _id,
            nextDist: marker.nextDist,
            prevDist: marker.prevDist,
            order: marker.order,
            walkingSpeed: settings.speed,
            distanceMeasure: settings.distance,
        });
        response = yield newMarker.save();
        for (const key in updatedMarkers) {
            response = yield UserMarkers.findOneAndUpdate({ _id: key }, {
                prevDist: updatedMarkers[key].prevDist,
                nextDist: updatedMarkers[key].nextDist,
                order: updatedMarkers[key].order,
            });
        }
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error1: ${error}`);
    }
});
export const updateAllMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { markers } = req.body;
        const { markers } = req.body;
        const updatePromises = Object.keys(markers).map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const marker = markers[key];
            return yield UserMarkers.updateOne({ _id: marker._id }, marker);
        }));
        yield Promise.all(updatePromises);
        res.status(200).json('Markers updated successfully');
    }
    catch (error) {
        res.status(500).send(`Server Error2: ${error}`);
    }
});
export const removeMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, _id } = req.body;
        const response = yield UserMarkers.deleteOne({ user_id: user_id, _id: _id });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error3: ${error}`);
    }
});
// TODO: add password hashing
export const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields required ' });
        return;
    }
    try {
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User with this email already exists' });
            return;
        }
        const newUser = new User({ name, email, password });
        const response = yield newUser.save();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error4: ${error}`);
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(`Server Error: ${error}`);
    }
});
export const getAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, markerId } = req.query;
        const accommodation = yield UserMarkers.findOne({ user_id: user_id, _id: markerId });
        res.status(200).json(accommodation);
    }
    catch (error) {
        res.status(500).send(`Server Error5: ${error}`);
    }
});
export const addAccommodation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, hotel, markerId } = req.body;
        const response = yield UserMarkers.updateOne({ user_id: user_id, _id: markerId }, { hotel: hotel });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(`Server Error6: ${error}`);
    }
});
// Delete accommodation when unselected
