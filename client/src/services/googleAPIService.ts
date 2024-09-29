import { getNearAccommodationsResponse, ErrorResponse,Accomodation, PictureData } from "../Interfaces/interfaces";

async function getNearAccommodations(lat: number, lng: number): Promise<getNearAccommodationsResponse | ErrorResponse> {
  try {
    const response = await fetch(`http://localhost:3001/getAccommodation?lat=${lat}&lon=${lng}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching accommodations:", error);
    return { error: "Error fetching accommodations" };
  }
}


async function fetchAccommodationPicture(photoReference:string) : Promise<PictureData | ErrorResponse> {
  
  const response = await fetch(`http://localhost:3001/accommodationPic?photo_reference=${photoReference}`);
  if (!response.ok) {
    throw new Error("Image not found");
  }// Create an object URL for the blob
  const res = await response.json();
  return res
}


async function extractAccommodations (lat: number, lng: number) :Promise<Accomodation[]| null> {
  const data : getNearAccommodationsResponse | ErrorResponse = await getNearAccommodations(lat, lng);
  if ('error' in data){
    console.log(data.error)
    return null;
  }
  const { results } = data;
  if (results.length === 0) {
    return null;
  }
  let outputArr : Accomodation[] = [];
  for (let i = 0; i < results.length; i++) {
    const accommodation = results[i];
    if (!accommodation.photos || accommodation.photos.length === 0) {
      continue; 
    }
    const pictureResult : PictureData| ErrorResponse = await fetchAccommodationPicture(accommodation.photos[0].photo_reference);
    if ('error' in pictureResult){
     return null
    }

    let url = '';
    if ('error' in pictureResult) {
      console.log(pictureResult.error);
    } else {
      url = pictureResult.data; 
    }

    const { name, vicinity } = accommodation;
    outputArr.push({ name, url, vicinity }); 
  }

  return outputArr;
}

const APIService = { extractAccommodations }
export default APIService


