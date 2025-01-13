import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const targetUrl = req.query.url as string;

  if (!targetUrl || typeof targetUrl !== "string") {
    return res.status(400).json({ error: "Invalid or missing target URL" });
  }

  try {
    const headers = { ...req.headers } as Record<string, string>;
    delete headers.host; // Pastikan header host dihapus (diatur otomatis oleh Node.js)

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to proxy request" });
  }
}
