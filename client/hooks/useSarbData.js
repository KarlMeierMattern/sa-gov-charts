import { useQuery } from "@tanstack/react-query";

const baseUrl =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

const staleTime = 604800;
const cacheTime = 604800;

export function useSarbData() {
  const sarbOther = useQuery({
    queryKey: ["sarb-other"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-other`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB other data");
        }
        return res.json();
      } catch (error) {
        throw new Error(`Failed to fetch SARB other data: ${error.message}`);
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbAll = useQuery({
    queryKey: ["sarb-all"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-all`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB all data");
        }
        return res.json();
      } catch (error) {
        throw new Error(`Failed to fetch SARB all data: ${error.message}`);
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbRepo = useQuery({
    queryKey: ["sarb-repo"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-repo`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB repo data");
        }
        return res.json();
      } catch (error) {
        throw new Error(`Failed to fetch SARB repo data: ${error.message}`);
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbJse = useQuery({
    queryKey: ["jse"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/jse`);
        if (!res.ok) {
          throw new Error("Failed to fetch JSE data");
        }
        return res.json();
      } catch (error) {
        throw new Error(`Failed to fetch JSE data: ${error.message}`);
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbRepoTimeline = useQuery({
    queryKey: ["sarb-repo-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-repo-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB repo timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB repo timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbFxTimeline = useQuery({
    queryKey: ["sarb-fx-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-fx-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB fx timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB fx timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbRealGdpTimeline = useQuery({
    queryKey: ["sarb-real-gdp-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-real-gdp-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB real GDP timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB real GDP timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbPrimeTimeline = useQuery({
    queryKey: ["sarb-prime-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-prime-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB prime timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB prime timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbChangePrimeTimeline = useQuery({
    queryKey: ["sarb-change-prime-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-change-prime-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB change prime timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB change prime timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbChangeRepoTimeline = useQuery({
    queryKey: ["sarb-change-repo-timeline"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/sarb-change-repo-timeline`);
        if (!res.ok) {
          throw new Error("Failed to fetch SARB change repo timeline data");
        }
        return res.json();
      } catch (error) {
        throw new Error(
          `Failed to fetch SARB change repo timeline data: ${error.message}`
        );
      }
    },
    staleTime,
    cacheTime,
  });

  const sarbGoldTimeline = useQuery({
    queryKey: ["sarb-gold-timeline"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/sarb-gold-timeline`);
      if (!res.ok) {
        throw new Error("Failed to fetch SARB gold timeline data");
      }
      return res.json();
    },
    staleTime,
    cacheTime,
  });

  const sarbGbpTimeline = useQuery({
    queryKey: ["sarb-gbp-timeline"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/sarb-gbp-timeline`);
      if (!res.ok) {
        throw new Error("Failed to fetch SARB gbp timeline data");
      }
      return res.json();
    },
    staleTime,
    cacheTime,
  });

  const sarbEuroTimeline = useQuery({
    queryKey: ["sarb-euro-timeline"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/sarb-euro-timeline`);
      if (!res.ok) {
        throw new Error("Failed to fetch SARB euro timeline data");
      }
      return res.json();
    },
  });

  return {
    sarbOther,
    sarbAll,
    sarbRepo,
    sarbJse,
    sarbRepoTimeline,
    sarbFxTimeline,
    sarbRealGdpTimeline,
    sarbPrimeTimeline,
    sarbChangePrimeTimeline,
    sarbChangeRepoTimeline,
    sarbGoldTimeline,
    sarbGbpTimeline,
    sarbEuroTimeline,
  };
}
