"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Динамический импорт компонента MapContainer с отключенным SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

export default function Home() {
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(null);
  const [route, setRoute] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude] as LatLngExpression);
        },
        (error) => {
          console.error("Error getting user's position", error);
        }
      );
    }
  }, []);

  const handleSetRoute = () => {
    if (userPosition) {
      const destination: LatLngExpression = [37.7749, -122.4194]; // Координаты точки B
      setRoute([userPosition, destination]);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={userPosition || [51.505, -0.09] as LatLngExpression}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {userPosition && <Marker position={userPosition} />}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
      <button onClick={handleSetRoute}>Проложить маршрут</button>
    </div>
  );
}
