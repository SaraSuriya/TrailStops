
export interface Marker {
    position: { lat: number; lng: number };
    hotel: string;
    nextDist: { dist: number; time: number };
    prevDist: { dist: number; time: number };
    order: number;
  }
  
  export interface Settings {
    speed: number;
    distance: string;
  }
  
  export interface AddMarkerRequestBody {
    _id: string;
    user_id: string;
    marker: Marker;
    updatedMarkers: Record<string, { prevDist: any; nextDist: any; order: number }>;
    settings: Settings;
  }
  