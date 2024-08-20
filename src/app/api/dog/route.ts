import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { DetailedDog, DogImage } from "@/app/types/dog/type";

// API route handler
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    // Fetching and processing detailed dog data
    const fetchDogs = async (): Promise<DetailedDog[]> => {
      try {
        const response = await axios.get<DogImage[]>(
          "https://api.thedogapi.com/v1/images/search?limit=10&order=ASC&has_breeds=1"
        );

        const detailedDogs: DetailedDog[] = await Promise.all(
          response.data.map(async (dog) => {
            const detailedResponse = await axios.get<DogImage>(
              `https://api.thedogapi.com/v1/images/${dog.id}`
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
              life_span:
                detailedResponse.data.breeds[0]?.life_span || "Unknown",
              name: detailedResponse.data.breeds[0]?.name || "Unknown",
              url: detailedResponse.data.url,
              lifeSpan: detailedResponse.data.breeds[0]?.life_span || "Unknown",
              temperament:
                detailedResponse.data.breeds[0]?.temperament || "Unknown",
            };
          })
        );

        return detailedDogs;
      } catch (error) {
        console.error("Error fetching dog data:", error);
        return [];
      }
    };

    const result = await fetchDogs();
    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
