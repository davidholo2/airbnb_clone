import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
        <div>
          <div className="my-4">
            <h2 className=" font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check In: {place.checkIn}
          <br />
          Check Out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8">
        <div>
          <h2 className=" font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="text-sm mb-4 mt-1 text-gray-600 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
