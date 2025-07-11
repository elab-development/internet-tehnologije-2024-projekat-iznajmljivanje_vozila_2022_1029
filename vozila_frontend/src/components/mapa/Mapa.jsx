import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import markerPng from '../images/marker.png';

// Create a Leaflet icon using your custom marker image
const markerIcon = L.icon({
  iconUrl: markerPng,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const locations = [
  // 7 lokacija u Beogradu
  { name: 'Rent-a-Car Terazije',    street: 'Terazije 1',                     city: 'Beograd', coords: [44.8132, 20.4612] },
  { name: 'Rent-a-Car Novi Beograd','street': 'Bulevar Mihajla Pupina 4',      city: 'Beograd', coords: [44.8065, 20.4651] },
  { name: 'Rent-a-Car Zemun',       street: 'Trg Republike 5',                city: 'Beograd', coords: [44.8400, 20.3796] },
  { name: 'Rent-a-Car Vračar',      street: 'Kralja Milana 8',                city: 'Beograd', coords: [44.8022, 20.4746] },
  { name: 'Rent-a-Car Dorćol',      street: 'Cara Dušana 12',                 city: 'Beograd', coords: [44.8239, 20.4642] },
  { name: 'Rent-a-Car Banovo Brdo', street: 'Obrenovićeva 19',                city: 'Beograd', coords: [44.7799, 20.4129] },
  { name: 'Rent-a-Car Karaburma',   street: 'Živka Davidovića 3',             city: 'Beograd', coords: [44.8110, 20.4435] },

  // 3 u Novom Sadu
  { name: 'Rent-a-Car Dunavski kej',street: 'Dunavski kej 7',                 city: 'Novi Sad', coords: [45.2550, 19.8516] },
  { name: 'Rent-a-Car Futoška',     street: 'Futoška 31',                     city: 'Novi Sad', coords: [45.2420, 19.8018] },
  { name: 'Rent-a-Car Petrovaradin',street: 'Petrovaradinska tvrđava',         city: 'Novi Sad', coords: [45.2488, 19.8738] },

  // 1 u Kragujevcu
  { name: 'Rent-a-Car Kragujevac',  street: 'Vojvode Mišića 45',             city: 'Kragujevac', coords: [44.0128, 20.9119] },

  // 1 u Kruševcu
  { name: 'Rent-a-Car Kruševac',    street: 'Car Dušana 10',                   city: 'Kruševac', coords: [43.5803, 21.3271] },

  // 1 u Kraljevu
  { name: 'Rent-a-Car Kraljevo',    street: 'Nemanjina 22',                   city: 'Kraljevo', coords: [43.7240, 20.6837] },
];

export default function Mapa() {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[44.0165, 21.0059]}
        zoom={7}
        scrollWheelZoom={false}
        className="leaflet-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {locations.map(loc => (
          <Marker
            key={loc.name}
            position={loc.coords}
            icon={markerIcon}
          >
            <Popup>
              <strong>{loc.name}</strong><br/>
              {loc.street}, {loc.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
