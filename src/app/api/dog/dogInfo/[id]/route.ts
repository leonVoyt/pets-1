import { DogImage } from "@/app/types/dog/type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, param: any) {
  try {
    if (req.method !== "GET") return;
    const { id } = param.params;

    const { data: detailedResponse } = await axios.get<DogImage>(
      `https://api.thedogapi.com/v1/images/${id}`
    );
    const result = {
      id: detailedResponse?.id,
      beradId: detailedResponse?.breeds[0]?.id,
      weight: detailedResponse?.breeds[0]?.weight,
      height: detailedResponse?.breeds[0]?.height,
      breed_group: detailedResponse?.breeds[0]?.breed_group || "Unknown Breed",
      life_span: detailedResponse?.breeds[0]?.life_span,
      name: detailedResponse?.breeds[0]?.name || "Unknown", // Get the breed name if available
      url: detailedResponse?.url, // Image URL
      lifeSpan: detailedResponse?.breeds[0]?.life_span || "Unknown", // Example of additional detail
      temperament: detailedResponse?.breeds[0]?.temperament || "Unknown", // Example of additional detail
    };
    return NextResponse.json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
}
