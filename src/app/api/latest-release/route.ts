import { NextResponse } from "next/server";

const GITHUB_API =
  "https://api.github.com/repos/helsky-labs/dropvox/releases/latest";

export async function GET() {
  try {
    const res = await fetch(GITHUB_API, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "dropvox-site",
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
        version: "0.7.2",
        tagName: "v0.7.2",
        downloadUrl:
          "https://github.com/helsky-labs/dropvox/releases/download/v0.7.2/DropVox-0.7.2.dmg",
        fileName: "DropVox-0.7.2.dmg",
        error: "Failed to fetch latest release",
      },
      { status: 200 } // Still return 200 with fallback data
    );
  }
}
