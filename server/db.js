import mongoose from "mongoose";
import redisClient from "./redisClient.js";

// Cache the connection promise across warm serverless invocations.
// On cold start the module re-evaluates, so this is reset to null.
let mongoPromise = null;
let redisPromise = null;

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
      // bufferCommands left at default (true) so queries queue while the
      // connection is being established on a cold start.
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

export async function connectRedis() {
  if (redisClient.isOpen) return redisClient;
  if (redisPromise) return redisPromise;

  redisPromise = redisClient
    .connect()
    .then(() => {
      console.log("Connected to Redis ✅");
      return redisClient;
    })
    .catch((err) => {
      redisPromise = null;
      throw err;
    });

  return redisPromise;
}

export async function connectAll() {
  await Promise.all([connectMongo(), connectRedis()]);
}
