// app/api/content/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/admin-auth";
import { getSupabaseAdminClient, rowToContentItem, contentItemToRow } from "@/lib/supabase";
import type { ContentItem } from "@/types";
import { revalidatePath } from "next/cache";
import { ContentSchema } from "@/lib/validation";   // ✅ validation
import { slugify } from "@/lib/slug";               // ✅ slug helper

const typeToGeneral = (t?: string) =>
  t?.toLowerCase() === "article"
    ? "articles"
    : t?.toLowerCase() === "blog"
    ? "blogs"
    : t?.toLowerCase() === "paper"
    ? "papers"
    : undefined;

// PUT - Update (validated, excludes self on duplicate slug)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const admin = getSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    const bodyJson = (await request.json()) as Partial<ContentItem>;

    // derive slug if missing
    if (!bodyJson.slug && bodyJson.title) {
      bodyJson.slug = slugify(bodyJson.title);
    }

    // validate (ensure id is included)
    const parsed = ContentSchema.safeParse({ ...bodyJson, id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.format() },
        { status: 400 }
      );
    }
    const body = parsed.data;

    // fetch current row to compare slug/type
    const { data: current } = await admin
      .from("content")
      .select("id, slug, content_type")
      .eq("id", id)
      .maybeSingle();

    // if slug changes, ensure it's unique (excluding self)
    if (body.slug && body.slug !== current?.slug) {
      const { data: clash } = await admin
        .from("content")
        .select("id")
        .eq("slug", body.slug)
        .maybeSingle();
      if (clash && clash.id !== id) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
      }
    }

    // update
    const row = contentItemToRow(body, id);
    const { data, error } = await admin
      .from("content")
      .update(row)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating content:", error);
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }

    // revalidate affected pages
    const newSlug = data.slug as string | undefined;
    const newType = typeToGeneral(data.content_type as string | undefined);
    const oldSlug = current?.slug as string | undefined;
    const oldType = typeToGeneral(current?.content_type as string | undefined);

    revalidatePath("/");
    revalidatePath("/policy");
    if (oldType) revalidatePath(`/general/${oldType}`);
    if (newType && newType !== oldType) revalidatePath(`/general/${newType}`);
    if (oldSlug) revalidatePath(`/content/${oldSlug}`);
    if (newSlug && newSlug !== oldSlug) revalidatePath(`/content/${newSlug}`);

    return NextResponse.json({ success: true, content: rowToContentItem(data) });
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating content:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Remove one
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const admin = getSupabaseAdminClient();
    if (!admin) return NextResponse.json({ error: "Server not configured" }, { status: 500 });

    // Grab slug/type first (to revalidate the right paths)
    const { data: existing } = await admin
      .from("content")
      .select("slug, content_type")
      .eq("id", id)
      .maybeSingle();

    const { error } = await admin.from("content").delete().eq("id", id);
    if (error) {
      console.error("Error deleting content:", error);
      return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
    }

    // Revalidate affected routes
    const slug = existing?.slug as string | undefined;
    const generalType = typeToGeneral(existing?.content_type as string | undefined);
    revalidatePath("/");
    revalidatePath("/policy");
    if (generalType) revalidatePath(`/general/${generalType}`);
    if (slug) revalidatePath(`/content/${slug}`);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting content:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
