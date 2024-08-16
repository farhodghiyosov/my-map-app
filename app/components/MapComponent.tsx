// components/MapComponent.js
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ positions, route }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      // Логика обновления местоположения
      map.invalidateSize();
    }
  }, [map, positions]);

  return (
    <MapContainer
      center={[positions[0]?.lat || 0, positions[0]?.lng || 0]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      whenReady={(mapInstance) => setMap(mapInstance.target)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((pos, idx) => (
        <Marker key={idx} position={[pos.lat, pos.lng]} />
      ))}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default MapComponent;