// pages/api/set-cookie.ts
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { token } = req.body;
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // Cookie berlaku selama 1 jam
        path: "/",
      })
    );

    res.status(200).json({ message: "Cookie telah disimpan" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
