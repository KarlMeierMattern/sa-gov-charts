import seedDatabase from "../scripts/seed.js";

export const handleCronJob = async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Cron job executed successfully" });
  } catch (error) {
    console.error("Cron job error:", error);
    res.status(500).json({ error: "Failed to execute cron job" });
  }
};
