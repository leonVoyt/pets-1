import { CatImage, DetailedCat } from "@/app/types/cat/type";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Define TypeScript interfaces

// Function to fetch detailed cat data
export const getCats = async (): Promise<DetailedCat[]> => {
  try {
    const response = await axios.get<CatImage[]>(
      "https://api.thecatapi.com/v1/images/search?limit=10&order=ASC&has_breeds=1"
    );

    const detailedCats: DetailedCat[] = await Promise.all(
      response.data.map(async (cat) => {
        const detailedResponse = await axios.get<CatImage>(
          `https://api.thecatapi.com/v1/images/${cat.id}`
        );

        return {
          id: detailedResponse.data.id,
          beradId: detailedResponse.data.breeds[0]?.id || "Unknown",
          weight: detailedResponse.data.breeds[0]?.weight || {
            imperial: "Unknown",
            metric: "Unknown",
          },
          height: detailedResponse.data.breeds[0]?.height || {
            imperial: "Unknown",
            metric: "Unknown",
          },
          breed_group:
            detailedResponse.data.breeds[0]?.breed_group || "Unknown Breed",
          life_span: detailedResponse.data.breeds[0]?.life_span || "Unknown",
          name: detailedResponse.data.breeds[0]?.name || "Unknown",
          url: detailedResponse.data.url,
          lifeSpan: detailedResponse.data.breeds[0]?.life_span || "Unknown",
          temperament:
            detailedResponse.data.breeds[0]?.temperament || "Unknown",
        };
      })
    );

    return detailedCats;
  } catch (error) {
    console.error("Error fetching cat data:", error);
    return [];
  }
};

// API route handler
export async function GET(
  req: NextApiRequest,
  context: any
): Promise<NextResponse> {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    const result = await getCats();
    return NextResponse.json({ result });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
