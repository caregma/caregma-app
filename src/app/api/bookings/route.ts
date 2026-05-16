import { NextResponse } from "next/server";
import { createBooking } from "@/lib/backend/booking";
import { requireApiRole } from "@/lib/backend/auth";

export async function POST(request: Request) {
  try {
    const profile = await requireApiRole("family");
    const body = await request.json();
    const result = await createBooking(body, profile.id);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create booking" },
      { status: 400 }
    );
  }
}
