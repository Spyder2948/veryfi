import { client } from "@/lib/client.mjs";
import 'dotenv/config';

export default async function search(req, res) {
  const { query } = req.query;


  const searchQuery = `*[_type in ["phone", "samsung"] && ( productName match $queryString + '*' || brand match $queryString + '*' || features match $queryString + '*')]
        | order(_createdAt desc)[0...20]`;

  const data = await client.fetch(searchQuery, {
    queryString: query,
  });

  res.status(200).json(data);

}