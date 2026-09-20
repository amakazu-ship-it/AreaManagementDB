import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PublicCase } from "../types";
import { officialCases } from "../lib/data";
import { fetchApprovedSubmissions } from "../lib/submissions";

interface CasesValue {
  cases: PublicCase[];
  communityCount: number;
  loadingCommunity: boolean;
  refresh: () => void;
}

const CasesContext = createContext<CasesValue | null>(null);

export function CasesProvider({ children }: { children: ReactNode }) {
  const [communityCases, setCommunityCases] = useState<PublicCase[]>([]);
  const [loadingCommunity, setLoadingCommunity] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoadingCommunity(true);
    fetchApprovedSubmissions().then((rows) => {
      if (!cancelled) {
        setCommunityCases(rows);
        setLoadingCommunity(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const value: CasesValue = {
    cases: [...officialCases, ...communityCases],
    communityCount: communityCases.length,
    loadingCommunity,
    refresh: () => setRefreshKey((k) => k + 1),
  };

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>;
}

export function useCases(): CasesValue {
  const ctx = useContext(CasesContext);
  if (!ctx) throw new Error("useCases must be used within CasesProvider");
  return ctx;
}
