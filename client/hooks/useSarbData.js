import { useQueries } from "@tanstack/react-query";

const baseUrl =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

const staleTime = 604800;
const cacheTime = 604800;

const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint} data`);
    }
    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch ${endpoint} data: ${error.message}`);
  }
};

const endpoints = [
  "sarb-other",
  "sarb-all",
  "sarb-repo",
  "jse",
  "sarb-repo-timeline",
  "sarb-fx-timeline",
  "sarb-real-gdp-timeline",
  "sarb-prime-timeline",
  "sarb-change-prime-timeline",
  "sarb-change-repo-timeline",
  "sarb-gold-timeline",
  "sarb-gbp-timeline",
  "sarb-euro-timeline",
];

export function useSarbData() {
  const results = useQueries({
    queries: endpoints.map((endpoint) => ({
      queryKey: [endpoint],
      queryFn: () => fetchData(endpoint),
      staleTime,
      cacheTime,
    })),
  });

  return {
    sarbOther: results[0],
    sarbAll: results[1],
    sarbRepo: results[2],
    sarbJse: results[3],
    sarbRepoTimeline: results[4],
    sarbFxTimeline: results[5],
    sarbRealGdpTimeline: results[6],
    sarbPrimeTimeline: results[7],
    sarbChangePrimeTimeline: results[8],
    sarbChangeRepoTimeline: results[9],
    sarbGoldTimeline: results[10],
    sarbGbpTimeline: results[11],
    sarbEuroTimeline: results[12],
  };
}
