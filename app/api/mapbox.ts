import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const accessToken = 'sk.eyJ1IjoiZmFyaG9kZ2hpeW9zb3YiLCJhIjoiY2x6dzljbzcxMGZicjJrczhtZDN6cnd3ayJ9.20VlUAocr3VAQbBopNmcpg'; // Замените на ваш токен Mapbox

  if (method === 'GET') {
    try {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${query.coords}?alternatives=true&geometries=geojson&access_token=${accessToken}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from Mapbox API' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
