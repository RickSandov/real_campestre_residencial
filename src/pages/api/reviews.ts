import type { NextApiRequest, NextApiResponse } from "next";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJZQil0DS5m4YRnhJyaR8q4tI&fields=reviews,user_ratings_total,rating&language=es-419&key=AIzaSyAwsH2Mx-HhEF-u3PctaLYAfZ3vFUSz-ss"
        );
        const data = await response.json();
        return res.status(200).json({
          reviews: data.result.reviews,
          rating: data.result.rating,
          totalRatings: data.result.user_ratings_total,
        });
      } catch (err: any) {
        return res.status(400).json({ error: err.message });
      }

    default:
      res.status(400).json("Invalid method");
  }
}
