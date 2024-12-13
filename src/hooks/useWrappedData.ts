import { useState } from "react";
import { useEffect } from "react";
import type { RouterOutputs } from "~/trpc/react";

export const useWrappedData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RouterOutputs["wrapped"]["create"] | null>(
    null,
  );

  useEffect(() => {
    const wrapped = localStorage.getItem("wrapped");
    const dashboardData = wrapped
      ? (JSON.parse(wrapped) as RouterOutputs["wrapped"]["create"])
      : null;
    setData(dashboardData);
    setLoading(false);
  }, []);

  return { data, loading };
};
