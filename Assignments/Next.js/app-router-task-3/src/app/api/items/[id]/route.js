import { getItemById } from "@/lib/items-service";
import { NextResponse } from "next/server";

// GET /api/items/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const item = await getItemById(id);

    if (!item) {
      return NextResponse.json(
        { error: `Item with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error(`Error in GET /api/items/[id]:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
