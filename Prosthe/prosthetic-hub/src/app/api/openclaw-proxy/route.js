import { NextResponse } from "next/server";

/**
 * Proxy route: forwards requests to the local OpenClaw gateway
 * to bypass CORS issues when embedding via iframe.
 *
 * Usage: /api/openclaw-proxy?path=/some-path
 */

const OPENCLAW_BASE = "http://127.0.0.1:18789";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";

    try {
        const res = await fetch(`${OPENCLAW_BASE}${path}`, {
            headers: {
                Accept: "text/html,application/json,*/*",
            },
        });

        const contentType = res.headers.get("content-type") || "text/html";
        const body = await res.text();

        return new NextResponse(body, {
            status: res.status,
            headers: {
                "Content-Type": contentType,
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Cannot reach OpenClaw gateway",
                detail: err.message,
                hint: `Ensure the daemon is running on ${OPENCLAW_BASE}`,
            },
            { status: 502 }
        );
    }
}
