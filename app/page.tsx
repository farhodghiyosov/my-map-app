// app/page.tsx
"use client"; // Добавьте эту строку в начале файла
// pages/index.js
import { useEffect, useState } from 'react';
import { realTimeDb } from '../app/lib/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import MapComponent from '../app/components/MapComponent';

const HomePage = () => {
  const [positions, setPositions] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const positionsRef = ref(realTimeDb, 'positions/');
    onValue(positionsRef, (snapshot) => {
      const data = snapshot.val();
      setPositions(Object.values(data));
    });

    const routeRef = ref(realTimeDb, 'routes/');
    onValue(routeRef, (snapshot) => {
      const data = snapshot.val();
      setRoute(Object.values(data));
    });
  }, []);

  return (
    <div>
      <MapComponent positions={positions} route={route} />
    </div>
  );
};

export default HomePage;
