import "../../styles/mapView.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
function MapView({ data }) {
  return (
    <div className="map-container">
      <div className="map-container-title">
        <h1>¿Dónde vas a estar?</h1>
      </div>
      <div className="map-container-map">
        <h2 className="location-p">
          <i className="fa-solid fa-location-dot"></i>
          {data.city.name}, {data.city.country}
        </h2>
        <div className="leaflet-container">
          <MapContainer
            center={[data.latitude, data.longitude]}
            zoom={14}
            scrollWheelZoom={false}
          >
       <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[data.latitude, data.longitude]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                <div className="nameAndImages-share">
                  <img
                    alt="Imagen Principal"
                    className="img-share-box"
                    src={data.images[0].url}
                  />
                  <h2>
                    {data.name}, {data.city.name}, {data.city.country} | Digital
                    Booking
                  </h2>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
export default MapView;
