import { useState, useEffect, useCallback } from "react";

export interface UseTableDataResult<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  paginatedData: T[] | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: () => void;
}

export function useTableData<T>(
  endpoint: string,
  staticData: T[] | null,
  refreshKey: number,
  filter: { key: string; value: string } | undefined,
  pageSize: number
): UseTableDataResult<T> {
  const [data, setData]       = useState<T[] | null>(staticData);
  const [loading, setLoading] = useState<boolean>(!staticData);
  const [error, setError]     = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const applyFilter = useCallback(
    (arr: T[]): T[] => {
      if (!filter) return arr;
      return arr.filter(
        (item) =>
          (item as Record<string, unknown>)[filter.key] === filter.value
      );
    },
    [filter]
  );

  const fetchData = useCallback(() => {
    if (staticData !== null) {
      const result = applyFilter(staticData);
      const id = window.setTimeout(() => setData(result), 0);
      return () => window.clearTimeout(id);
    }
    if (!endpoint) return;

    let cancelled = false;
    const t = window.setTimeout(() => {
      if (!cancelled) setLoading(true);
    }, 0);

    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d: unknown) => {
        if (cancelled) return;
        const raw: T[] = Array.isArray(d)
          ? d
          : (d as { content?: T[]; data?: T[] }).content ??
            (d as { content?: T[]; data?: T[] }).data ??
            [];
        setData(applyFilter(raw));
        setError(null);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Errore sconosciuto");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [endpoint, staticData, applyFilter]);

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint, refreshKey, fetchData]);

  const totalPages =
    pageSize > 0 && data ? Math.ceil(data.length / pageSize) : 1;

  const paginatedData =
    pageSize > 0 && data
      ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : data;

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
    fetchData,
  };
}