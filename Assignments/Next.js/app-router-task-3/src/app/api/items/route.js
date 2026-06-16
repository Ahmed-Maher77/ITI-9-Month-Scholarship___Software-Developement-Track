import { getItems } from "@/lib/items-service";
import { NextResponse } from "next/server";

// Returns a list of all products in the database.
export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error in GET /api/items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
