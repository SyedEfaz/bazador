"use client";

import { useEffect, useState } from "react";

type AsyncDataState<T> = {
  data: T | undefined;
  loading: boolean;
  error: boolean;
};

export function useAsyncData<T>(fetcher: () => Promise<T>): AsyncDataState<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);

    void (async () => {
      try {
        const result = await fetcher();
        if (active) setData(result);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetcher]);

  return { data, loading, error };
}
