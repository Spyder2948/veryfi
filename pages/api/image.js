import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', response.headers.get('Content-Type'));
        res.send(Buffer.from(buffer));
      } else {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }