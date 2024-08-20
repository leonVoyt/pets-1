import { CatImage } from "@/app/types/cat/type";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// API route handler
export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    if (req.method !== "GET")
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );

    const { id } = params;

    const { data: detailedResponse } = await axios.get<CatImage>(
      `https://api.thecatapi.com/v1/images/${id}`
    );

    const result = {
      id: detailedResponse?.id,
      beradId: detailedResponse?.breeds[0]?.id,
      weight: detailedResponse?.breeds[0]?.weight,
      height: detailedResponse?.breeds[0]?.height,
      breed_group: detailedResponse?.breeds[0]?.breed_group || "Unknown Breed",
      life_span: detailedResponse?.breeds[0]?.life_span,
      name: detailedResponse?.breeds[0]?.name || "Unknown",
      url: detailedResponse?.url, // Image URL
      temperament: detailedResponse?.breeds[0]?.temperament || "Unknown",
      origin: detailedResponse?.breeds[0]?.origin || "Unknown",
      country_codes: detailedResponse?.breeds[0]?.country_codes || "Unknown",
      description:
        detailedResponse?.breeds[0]?.description || "No description available",
      indoor: detailedResponse?.breeds[0]?.indoor,
      lap: detailedResponse?.breeds[0]?.lap,
      alt_names: detailedResponse?.breeds[0]?.alt_names || "None",
      adaptability: detailedResponse?.breeds[0]?.adaptability,
      affection_level: detailedResponse?.breeds[0]?.affection_level,
      child_friendly: detailedResponse?.breeds[0]?.child_friendly,
      dog_friendly: detailedResponse?.breeds[0]?.dog_friendly,
      energy_level: detailedResponse?.breeds[0]?.energy_level,
      grooming: detailedResponse?.breeds[0]?.grooming,
      health_issues: detailedResponse?.breeds[0]?.health_issues,
      intelligence: detailedResponse?.breeds[0]?.intelligence,
      shedding_level: detailedResponse?.breeds[0]?.shedding_level,
      social_needs: detailedResponse?.breeds[0]?.social_needs,
      stranger_friendly: detailedResponse?.breeds[0]?.stranger_friendly,
      vocalisation: detailedResponse?.breeds[0]?.vocalisation,
      experimental: detailedResponse?.breeds[0]?.experimental,
      hairless: detailedResponse?.breeds[0]?.hairless,
      natural: detailedResponse?.breeds[0]?.natural,
      rare: detailedResponse?.breeds[0]?.rare,
      rex: detailedResponse?.breeds[0]?.rex,
      suppressed_tail: detailedResponse?.breeds[0]?.suppressed_tail,
      short_legs: detailedResponse?.breeds[0]?.short_legs,
      wikipedia_url:
        detailedResponse?.breeds[0]?.wikipedia_url || "No URL available",
      hypoallergenic: detailedResponse?.breeds[0]?.hypoallergenic,
      reference_image_id: detailedResponse?.breeds[0]?.reference_image_id,
    };

    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
