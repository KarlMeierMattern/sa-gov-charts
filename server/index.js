// Local development entry point. Not used in production (see api/[...path].js).
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectAll } from "./db.js";

console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
console.log(
  "UPSTASH_REDIS_REST_URL:",
  process.env.UPSTASH_REDIS_REST_URL ? "✅ Set" : "❌ Missing",
);
console.log(
  "UPSTASH_REDIS_REST_TOKEN:",
  process.env.UPSTASH_REDIS_REST_TOKEN ? "✅ Set" : "❌ Missing",
);
console.log("NODE_ENV:", process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectAll();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
})();

export default app;
