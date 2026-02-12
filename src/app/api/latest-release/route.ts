import { NextResponse } from "next/server";
import { CURRENT_VERSION, DOWNLOAD_BASE } from "@/lib/version";

const DMG_FILENAME = `Tokencentric-${CURRENT_VERSION}-arm64.dmg`;

export async function GET() {
  return NextResponse.json({
    version: CURRENT_VERSION,
    tagName: `v${CURRENT_VERSION}`,
    downloadUrl: `${DOWNLOAD_BASE}/${DMG_FILENAME}`,
    fileName: DMG_FILENAME,
  });
}
