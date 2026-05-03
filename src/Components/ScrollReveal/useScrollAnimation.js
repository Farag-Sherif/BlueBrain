import { useEffect, useRef, useState } from "react";

/**
 * useScrollAnimation
 * Returns a ref and a boolean `isVisible`.
 * Once the element enters the viewport, `isVisible` becomes true (and stays true).
 *
 * @param {number} threshold – 0–1, fraction of element that must be visible (default 0.15)
 * @param {string} rootMargin – CSS margin around the root (default "0px")
 */
export function useScrollAnimation(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
