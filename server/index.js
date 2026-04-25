import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectAll } from "./db.js";

console.log("ORIGIN_1:", process.env.ORIGIN_1 ? "✅ Set" : "❌ Missing");
console.log("ORIGIN_2:", process.env.ORIGIN_2 ? "✅ Set" : "❌ Missing");
console.log("REDIS_URL:", process.env.REDIS_URL ? "✅ Set" : "❌ Missing");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
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
