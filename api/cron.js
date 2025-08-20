import seedDatabase from "../server/scripts/seed.js";

export default async function handler(req, res) {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Cron job executed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to execute cron job" });
  }
}
