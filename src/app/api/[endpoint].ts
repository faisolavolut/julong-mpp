import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ambil cookie dari header
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token; // Ambil token dari cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Lakukan sesuatu dengan token (misalnya, validasi)
  return res.status(200).json({ message: "Token ditemukan", token });
}
