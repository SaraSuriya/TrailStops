//Interfaces are temporary located in the same file.
//I group them in the order i found them in the folders :

import { LatLng } from "leaflet"

//HELPER FUNCTIONS:

export interface PointLngLat {
  lng: number,
  lat: number
}

export interface CalculationSettings {
  distance: string,
  speed: number
}

//COMPONENTS

export interface Distance {
  distance: number,
  time: number
}

export interface MarkerInterface {
  _id: string,
  user_id: string,
  hotel: string,
  prevDist: Distance | null,
  nextDist: Distance | null,
  position: LatLng,
  walkingSpeed: number,
  distanceMeasure: string, //settingsData.distance. Should be measure (km or miles)
};


//API SERVICE

export interface User {
  email: string,
  name: string,
  password: string,
  __v: number,
  _id: string
}