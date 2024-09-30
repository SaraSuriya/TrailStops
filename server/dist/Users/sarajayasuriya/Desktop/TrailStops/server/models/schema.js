import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const userMarkersSchema = new Schema({
    _id: { type: String, required: true },
    user_id: { type: String, required: true },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    hotel: { type: String },
    prevDist: {
        dist: { type: Number, required: true },
        time: { type: Number, required: true },
    },
    nextDist: {
        dist: { type: Number, required: true },
        time: { type: Number, required: true },
    },
    order: { type: Number },
    walkingSpeed: { type: Number, required: true },
    distanceMeasure: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);
const UserMarkers = mongoose.model('UserMarkers', userMarkersSchema);
export { User, UserMarkers };
