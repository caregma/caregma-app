import { NextResponse } from "next/server";
import { requireApiProfile } from "@/lib/backend/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

export async function POST(request: Request) {
  try {
    const profile = await requireApiProfile();
    const formData = await request.formData();
    const file = formData.get("file");
    const relatedSessionId = formData.get("sessionId");

    if (!(file instanceof File)) throw new Error("A file is required.");
    if (!ALLOWED_TYPES.has(file.type)) throw new Error("Unsupported file type.");
    if (file.size > MAX_FILE_BYTES) throw new Error("File is larger than 10 MB.");

    const supabase = await createSupabaseServerClient();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${profile.id}/${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("caregma-documents")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data, error } = await supabase
      .from("documents")
      .insert({
        owner_user_id: profile.id,
        related_session_id: typeof relatedSessionId === "string" ? relatedSessionId : null,
        filename: file.name,
        storage_path: storagePath,
        mime_type: file.type,
        size_bytes: file.size,
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ document: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
