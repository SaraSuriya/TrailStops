import { PointLngLat } from '../Interfaces/interfaces'

// check that the current marker falls between its surrounding route points
// lats & lngs either in a positive or negative direction
export default function isMarkerBetweenRoutePoints(marker: any, routePoint1: PointLngLat, routePoint2: PointLngLat) { //routePoint1 & 2: TYPE OR INTERFACE
  return (
    ((marker.position.lng >= routePoint1.lng && marker.position.lng <= routePoint2.lng) ||
      (marker.position.lng <= routePoint1.lng && marker.position.lng >= routePoint2.lng)) &&
    ((marker.position.lat >= routePoint1.lat && marker.position.lat <= routePoint2.lat) ||
      (marker.position.lat <= routePoint1.lat && marker.position.lat >= routePoint2.lat))
  );
};
