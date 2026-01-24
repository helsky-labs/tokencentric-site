import { NextResponse } from "next/server";

const GITHUB_API =
  "https://api.github.com/repos/helsky-labs/tokencentric/releases/latest";

export async function GET() {
  try {
    const res = await fetch(GITHUB_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "tokencentric-site",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const data = await res.json();
    const dmgAsset = data.assets?.find((a: { name: string }) =>
      a.name.endsWith(".dmg")
    );

    return NextResponse.json({
      version: data.tag_name?.replace(/^v/, ""),
      tagName: data.tag_name,
      downloadUrl: dmgAsset?.browser_download_url || null,
      fileName: dmgAsset?.name || null,
      downloadCount: dmgAsset?.download_count || 0,
      publishedAt: data.published_at,
      releaseName: data.name,
      releaseNotes: data.body,
    });
  } catch (error) {
    // Fallback to hardcoded latest known version
    return NextResponse.json(
      {
        version: "0.2.0",
        tagName: "v0.2.0",
        downloadUrl:
          "https://github.com/helsky-labs/tokencentric/releases/download/v0.2.0/Tokencentric-0.2.0.dmg",
        fileName: "Tokencentric-0.2.0.dmg",
        error: "Failed to fetch latest release",
      },
      { status: 200 } // Still return 200 with fallback data
    );
  }
}
