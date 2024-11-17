import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => {
  const [locations, setLocations] = useState([]);

  // click on the map 
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const rating = prompt("Rate this area (1-Red, 2-Orange, 3-Green):");
        if (rating >= 1 && rating <= 3) {
          setLocations([...locations, { lat, lng, rating: parseInt(rating) }]);
        }
      },
    });
    return null;
  };

  // thecolor based on rating
  const getColor = (rating) => {
    switch (rating) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "green";
      default:
        return "gray";
    }
  };

  // map bounds      N E S W
  const bounds = [
    [33.972528, -117.331639], // SW corner
    [33.979306, -117.318056], // NE corner
  ];

  return (
    <div className="App">
      <div className="header">
        <h1>UCR Skate Map</h1>
      </div>
      <div className="map-container">
        <MapContainer
          center={[33.979167, -117.3280]} // center of UCR approx 
          zoom={16}
          style={{ height: "100vh", width: "100%" }}
          maxBounds={bounds}
          maxBoundsViscosity={1.0} // no outofbounds
        >
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution='Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
          />
          <MapClickHandler />
          {locations.map((loc, index) => (
            <CircleMarker
              key={index}
              center={[loc.lat, loc.lng]}
              color={getColor(loc.rating)}
              radius={10}
            >
              <Popup>
                <div>
                  <strong>Rating:</strong> {loc.rating}
                  <br />
                  <strong>Latitude:</strong> {loc.lat.toFixed(2)}
                  <br />
                  <strong>Longitude:</strong> {loc.lng.toFixed(2)}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <div className="legend">
          <h3>Legend</h3>
          <div><span className="red"></span> Unsafe for skateboarding</div>
          <div><span className="orange"></span> Moderate safety</div>
          <div><span className="green"></span> Great for skateboarding</div>
        </div>
      </div>
    </div>
  );
};

export default App;
