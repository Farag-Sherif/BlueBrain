import { useScrollAnimation } from "./useScrollAnimation";

/**
 * ScrollReveal
 * Wraps any children and animates them into view on scroll.
 *
 * Props:
 *  - variant: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "fadeIn" | "zoomIn" | "flipUp"
 *  - delay:   CSS delay string e.g. "0ms", "200ms" (default "0ms")
 *  - duration: CSS duration string e.g. "600ms" (default "700ms")
 *  - className: extra classes on the wrapper div
 *  - threshold: 0–1 intersection threshold (default 0.15)
 *
 * Usage:
 *   <ScrollReveal variant="fadeUp" delay="100ms">
 *     <YourComponent />
 *   </ScrollReveal>
 */

const variants = {
  fadeUp: {
    hidden: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  fadeDown: {
    hidden: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  fadeLeft: {
    hidden: "opacity-0 translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  fadeRight: {
    hidden: "opacity-0 -translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  fadeIn: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  zoomIn: {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  flipUp: {
    hidden: "opacity-0 rotate-x-12 translate-y-8",
    visible: "opacity-100 rotate-x-0 translate-y-0",
  },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = "0ms",
  duration = "700ms",
  className = "",
  threshold = 0.15,
}) {
  const [ref, isVisible] = useScrollAnimation(threshold);
  const v = variants[variant] ?? variants.fadeUp;

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? v.visible : v.hidden} ${className}`}
      style={{
        transitionDuration: duration,
        transitionDelay: isVisible ? delay : "0ms",
      }}>
      {children}
    </div>
  );
}
