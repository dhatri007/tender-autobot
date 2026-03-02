import { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

export type Product = {
  id: string;
  name: string;
  type: string;
  finish: string;
  voc: string;
  coverage: number;
  price_per_litre: number;
  packaging: string;
  location: string;
};

export type Match = {
  product: Product;
  score: number;
  gap: number;
  suggestion: string;
};

export type Tender = {
  id: string;
  fileName: string;
  summary: string;
  matchedProducts: Match[];
  status: string;
};

type AppContextType = {
  products: Product[];
  setProducts: (p: Product[]) => void;

  currentTender: Tender | null;
  setCurrentTender: (t: Tender | null) => void;

  tenderHistory: Tender[];
  setTenderHistory: React.Dispatch<React.SetStateAction<Tender[]>>;
};

/* ================= CONTEXT ================= */

const AppContext = createContext<AppContextType | null>(null);

/* ================= PROVIDER ================= */

export function AppProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentTender, setCurrentTender] =
    useState<Tender | null>(null);
  const [tenderHistory, setTenderHistory] =
    useState<Tender[]>([]);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        currentTender,
        setCurrentTender,
        tenderHistory,
        setTenderHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* ================= HOOK ================= */

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppContext missing");
  return ctx;
};