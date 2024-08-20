import axios from "axios";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, param: any) {
  const { id } = param.params;
  try {
    if (req.method !== "GET") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    const { data: result } = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}`
    );

    return NextResponse.json({
      result: result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
