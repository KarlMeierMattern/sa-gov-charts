// npm install pdfjs-dist
import statsSaScraper from "../scraping/statsSaScraper.js";
import axios from "axios";
import fs from "fs";

const postStatsSaController = async (req, res) => {
  const url = process.env.STATS_SA_QLFS;
  try {
    const text = await statsSaScraper(url);
    console.log(text);
  } catch (error) {
    console.error("Error in main process:", error);
  }
};

const getStatsSaController = async (req, res) => {};

const downloadStats = async (req, res) => {
  try {
    const response = await axios.get(process.env.STATS_SA_QLFS, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(
      "/Users/alexander/code/sa-gov-charts/backend/stats.pdf",
      response.data
    );
    console.log("PDF downloaded successfully.");
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

export { postStatsSaController, getStatsSaController, downloadStats };
