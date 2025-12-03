// app/api/content/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/admin-auth";
import {
  getSupabaseClient,
  getSupabaseAdminClient,
  contentItemToRow,
  rowToContentItem,
} from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { ContentSchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";
import type { ContentItem } from "@/types";
import { randomUUID } from "crypto";

// Disable caching for this route to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Map ContentType -> /general route segment
const typeToGeneral = (t?: string) =>
  t?.toLowerCase() === "article"
    ? "articles"
    : t?.toLowerCase() === "blog"
    ? "blogs"
    : t?.toLowerCase() === "paper"
    ? "papers"
    : undefined;

// GET (public) — list content (optionally add pagination later)
export async function GET() {
  try {
    const client = getSupabaseClient();
    if (!client) {
      console.warn('[API] No Supabase client available');
      return NextResponse.json([]);
    }

    const { data, error } = await client
      .from("content")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      console.error('[API] Error fetching content:', error);
      // Return empty array instead of failing
      return NextResponse.json([]);
    }

    if (data) {
      const contentItems = data.map(rowToContentItem);
      return NextResponse.json(contentItems, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — Create (admin write, with validation + duplicate slug guard)
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const bodyJson = (await request.json()) as Partial<ContentItem>;

    // Generate ID if missing
    if (!bodyJson.id) {
      bodyJson.id = randomUUID();
    }

    // Derive slug if missing
    if (!bodyJson.slug) {
      if (bodyJson.title) {
        bodyJson.slug = slugify(bodyJson.title);
      } else {
        bodyJson.slug = `content-${Date.now()}`;
      }
    }

    // Validate payload (all fields are optional now)
    const parsed = ContentSchema.safeParse(bodyJson);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.format() },
        { status: 400 }
      );
    }
    const body = parsed.data;

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    // Duplicate slug guard
    const { data: exists } = await admin
      .from("content")
      .select("id")
      .eq("slug", body.slug)
      .maybeSingle();

    if (exists) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    // Insert
    const row = contentItemToRow(body);
    const { data, error } = await admin
      .from("content")
      .insert(row)
      .select("*")
      .single();

    if (error) {
      console.error("Error saving to Supabase:", error);
      return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }

    // On-demand revalidation (instant UI refresh)
    const newSlug = data.slug as string;
    const generalType = typeToGeneral(data.content_type as string | undefined);
    revalidatePath("/"); // home
    revalidatePath("/policy"); // if you have a policy listing page
    revalidatePath("/categories"); // if you have a categories hub
    if (generalType) revalidatePath(`/general/${generalType}`);
    if (newSlug) revalidatePath(`/content/${newSlug}`);
    // If you render category pages per law area, and can compute a slug, add:
    // if (data.law_area) revalidatePath(`/categories/${toSlug(data.law_area)}`);

    return NextResponse.json({ success: true, content: rowToContentItem(data) });
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating content:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — Delete ALL content (admin). Use with caution.
export async function DELETE() {
  try {
    await requireAuth();

    const admin = getSupabaseAdminClient();
    if (!admin) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const { error } = await admin.from("content").delete().neq("id", "");
    if (error) {
      console.error("Error deleting content:", error);
      return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
    }

    // Revalidate main listings after mass delete
    revalidatePath("/");
    revalidatePath("/policy");
    revalidatePath("/categories");
    revalidatePath("/general/articles");
    revalidatePath("/general/blogs");
    revalidatePath("/general/papers");

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting content:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
