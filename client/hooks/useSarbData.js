import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const staleTime = 604800;
const gcTime = 604800;

async function fetchDashboard() {
  const res = await fetch("/api/dashboard", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
}

function createSlice(query, key) {
  return {
    data: query.data?.[key],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useSarbData() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime,
    gcTime,
  });

  return useMemo(
    () => ({
      sarbOther: createSlice(query, "sarbOther"),
      sarbAll: createSlice(query, "sarbAll"),
      sarbRepo: createSlice(query, "sarbRepo"),
      sarbJse: createSlice(query, "jse"),
      sarbRepoTimeline: createSlice(query, "sarbRepoTimeline"),
      sarbFxTimeline: createSlice(query, "sarbFxTimeline"),
      sarbRealGdpTimeline: createSlice(query, "sarbRealGdpTimeline"),
      sarbPrimeTimeline: createSlice(query, "sarbPrimeTimeline"),
      sarbChangePrimeTimeline: createSlice(query, "sarbChangePrimeTimeline"),
      sarbChangeRepoTimeline: createSlice(query, "sarbChangeRepoTimeline"),
      sarbGoldTimeline: createSlice(query, "sarbGoldTimeline"),
      sarbGbpTimeline: createSlice(query, "sarbGbpTimeline"),
      sarbEuroTimeline: createSlice(query, "sarbEuroTimeline"),
      sarbUnemployment: createSlice(query, "unemployment"),
      sarbUnemploymentTimeline: createSlice(query, "unemploymentTimeline"),
      query,
    }),
    [
      query.data,
      query.isLoading,
      query.isFetching,
      query.isError,
      query.error,
      query.refetch,
    ]
  );
}
