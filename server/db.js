import mongoose from "mongoose";

// Cache the connection promise across warm serverless invocations.
// On cold start the module re-evaluates, so this is reset to null.
let mongoPromise = null;

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoPromise) return mongoPromise;

  mongoPromise = mongoose
    .connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then((m) => {
      console.log("App connected to MongoDB ✅");
      return m.connection;
    })
    .catch((err) => {
      mongoPromise = null;
      throw err;
    });

  return mongoPromise;
}

// Upstash Redis is HTTP-based and stateless — no connect step required.
// Kept as `connectAll` for API compatibility with callers.
export async function connectAll() {
  await connectMongo();
}
