import { useState, useEffect } from "react";

export function useScrollSpy(ids, offset = 0) {
  const [activeId, setActiveId] = useState(ids[0] || "");

  useEffect(() => {
    if (!ids.length) return;

    let rafId;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const id of [...ids].reverse()) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop - 100) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        handleScroll();
        rafId = undefined;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [ids, offset]);

  return activeId;
}
