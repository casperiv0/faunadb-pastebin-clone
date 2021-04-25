import { handleRequest } from "@lib/fetch";
import * as React from "react";

export type NullableIntersection = IntersectionObserver | null;
export type States = "fetching" | "idle";

export function useFetchObserver<T = unknown>(items: T[], apiRoute: string, amountToAdd = 30) {
  const observer = React.useRef<unknown>(null);
  const [fetchedItems, setItems] = React.useState(items);
  const [previousLength, setPreviousLength] = React.useState(amountToAdd);
  const [state, setState] = React.useState<States>("idle");

  React.useEffect(() => {
    setItems(items);
  }, [items]);

  const fetchMore = React.useCallback(async () => {
    const { data } = await handleRequest(`${apiRoute}?amount=${previousLength}`, "GET");

    setItems(data);
    setState("idle");
  }, [apiRoute, previousLength]);

  const ref = React.useCallback(
    (node) => {
      if (previousLength >= items.length) return;

      if (observer.current) {
        (observer.current as NullableIntersection)?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPreviousLength((v) => v + amountToAdd);
          setState("fetching");
          fetchMore();
        }
      });

      if (node) {
        (observer.current as NullableIntersection)?.observe(node);
      }

      return () => {
        observer.current = null;
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, amountToAdd],
  );

  return {
    ref,
    items: fetchedItems,
    state,
  };
}
