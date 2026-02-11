import { NextResponse } from "next/server";

const CURRENT_VERSION = "1.0.0";
const DOWNLOAD_BASE = `https://github.com/helsky-labs/tokencentric/releases/download/v${CURRENT_VERSION}`;
const DMG_FILENAME = `Tokencentric-${CURRENT_VERSION}-arm64.dmg`;

export async function GET() {
  return NextResponse.json({
    version: CURRENT_VERSION,
    tagName: `v${CURRENT_VERSION}`,
    downloadUrl: `${DOWNLOAD_BASE}/${DMG_FILENAME}`,
    fileName: DMG_FILENAME,
  });
}
