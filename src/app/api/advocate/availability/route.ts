import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApiRole } from "@/lib/backend/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const availabilitySchema = z.object({
  blocks: z.array(
    z.object({
      weekday: z.number().int().min(0).max(6),
      startTime: z.string(),
      endTime: z.string(),
      timezone: z.string().default("America/Chicago"),
      repeatsWeekly: z.boolean().default(true),
    })
  ),
});

export async function GET() {
  try {
    const profile = await requireApiRole("advocate");
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("advocate_availability_blocks")
      .select("*")
      .eq("advocate_id", profile.id)
      .order("weekday");

    if (error) throw new Error(error.message);
    return NextResponse.json({ blocks: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load availability" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const profile = await requireApiRole("advocate");
    const payload = availabilitySchema.parse(await request.json());
    const supabase = await createSupabaseServerClient();

    const { error: deleteError } = await supabase
      .from("advocate_availability_blocks")
      .delete()
      .eq("advocate_id", profile.id);

    if (deleteError) throw new Error(deleteError.message);

    if (payload.blocks.length > 0) {
      const { error } = await supabase.from("advocate_availability_blocks").insert(
        payload.blocks.map((block) => ({
          advocate_id: profile.id,
          weekday: block.weekday,
          start_time: block.startTime,
          end_time: block.endTime,
          timezone: block.timezone,
          repeats_weekly: block.repeatsWeekly,
        }))
      );
      if (error) throw new Error(error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save availability" },
      { status: 400 }
    );
  }
}
