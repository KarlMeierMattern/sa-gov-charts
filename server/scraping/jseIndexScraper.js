// JSE index values via Yahoo Finance.
// jse.co.za is behind Cloudflare and blocks headless browsers in CI.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const INDICES = [
  { index: 0, symbol: "^J803.JO", name: "All Property" },
  { index: 1, symbol: "^J203.JO", name: "All Share" },
  { index: 6, symbol: "^J200.JO", name: "Top 40" },
  { index: 7, symbol: "^J800.JO", name: "Tradable Property" },
];

function formatIndexValue(price) {
  return Math.round(price).toLocaleString("en-US");
}

async function fetchYahooQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance request failed for ${symbol}: ${response.status}`);
  }

  const payload = await response.json();
  const meta = payload?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;

  if (price == null) {
    throw new Error(`No price returned for ${symbol}`);
  }

  return price;
}

const jseIndexScraper = async () => {
  try {
    const data = [];

    for (const { index, symbol, name } of INDICES) {
      const price = await fetchYahooQuote(symbol);
      data.push({
        index,
        name,
        value: formatIndexValue(price),
      });
    }

    return data;
  } catch (error) {
    console.error("Error extracting JSE data:", error.message);
    throw new Error("Failed to scrape JSE data");
  }
};

export default jseIndexScraper;
