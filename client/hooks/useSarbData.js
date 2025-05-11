import { useQuery } from "@tanstack/react-query";

const baseUrl =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

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
  });

  return {
    sarbOther,
    sarbAll,
    sarbRepo,
    sarbJse,
    sarbRepoTimeline,
    sarbFxTimeline,
    sarbRealGdpTimeline,
  };
}
