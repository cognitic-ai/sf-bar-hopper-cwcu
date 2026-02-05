import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Bar } from "@/data/bars";

interface RouteContextType {
  route: Bar[];
  addToRoute: (bar: Bar) => void;
  removeFromRoute: (barId: string) => void;
  reorderRoute: (fromIndex: number, toIndex: number) => void;
  clearRoute: () => void;
  isInRoute: (barId: string) => boolean;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Bar[]>([]);

  const addToRoute = useCallback((bar: Bar) => {
    setRoute((prev) => {
      if (prev.some((b) => b.id === bar.id)) return prev;
      return [...prev, bar];
    });
  }, []);

  const removeFromRoute = useCallback((barId: string) => {
    setRoute((prev) => prev.filter((b) => b.id !== barId));
  }, []);

  const reorderRoute = useCallback((fromIndex: number, toIndex: number) => {
    setRoute((prev) => {
      const newRoute = [...prev];
      const [removed] = newRoute.splice(fromIndex, 1);
      newRoute.splice(toIndex, 0, removed);
      return newRoute;
    });
  }, []);

  const clearRoute = useCallback(() => {
    setRoute([]);
  }, []);

  const isInRoute = useCallback(
    (barId: string) => route.some((b) => b.id === barId),
    [route]
  );

  return (
    <RouteContext.Provider
      value={{ route, addToRoute, removeFromRoute, reorderRoute, clearRoute, isInRoute }}
    >
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
}
