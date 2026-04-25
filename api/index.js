import app from "../server/app.js";
import { connectAll } from "../server/db.js";

export default async function handler(req, res) {
  try {
    await connectAll();
  } catch (error) {
    console.error("Failed to initialise connections:", error);
    return res.status(503).json({ msg: "Service temporarily unavailable" });
  }
  return app(req, res);
}
