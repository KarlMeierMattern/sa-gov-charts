// https://www.resbank.co.za/en/home/what-we-do/monetary-policy
// This scraper is not being used

import puppeteer from "puppeteer";

const sarbOverviewScraper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    const data = await page.evaluate(() => {
      const elements = document.querySelectorAll(".header__statitem");
      console.log(elements.length); // Check how many elements are matched

      const cpi = document
        .querySelector(".header__statitem")
        ?.textContent.trim()
        .match(/\d+(\.\d+)?%/)?.[0];
      const repoRate = document
        .querySelector(".rateindicator__pcnt.mb-0")
        ?.textContent.trim();
      const target = document
        .querySelector(".rateindicator__pcnttarget")
        ?.textContent.trim();

      return {
        cpi,
        repoRate,
        target,
      };
    });

    await browser.close();
    return data;
  } catch (error) {
    console.error("Scraping error:", error);
    throw error;
  }
};

export default sarbOverviewScraper;
