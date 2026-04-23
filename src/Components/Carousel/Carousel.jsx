import { useState, useRef, useEffect, useCallback } from "react";

const GAP = 16;

function getVisible(width) {
  if (width < 480) return 1;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function Carousel({ children }) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visible, setVisible] = useState(4);

  const trackRef = useRef(null);
  const items = Array.isArray(children) ? children : [children];
  const max = Math.max(0, items.length - visible);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const w = trackRef.current.offsetWidth;
    const v = getVisible(w);
    setVisible(v);
    setCardWidth((w - GAP * (v - 1)) / v);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    setIndex((i) => Math.min(i, max));
  }, [max]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(max, i + 1));
  const offset = index * (cardWidth + GAP);

  return (
    <div>
      <div className="relative flex items-center">
        {/* Left */}
        <button
          onClick={prev}
          disabled={index === 0}
          className={`absolute -left-4 sm:-left-6 z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-[#3730a3] bg-white/30 backdrop-blur-sm flex items-center justify-center ${
            index === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}>
          <svg
            width="14"
            height="14"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e1b4b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Track */}
        <div ref={trackRef} className="overflow-x-hidden w-full py-10">
          <div
            className="flex transition-transform duration-300"
            style={{ gap: GAP, transform: `translateX(-${offset}px)` }}>
            {items.map((child, i) => (
              <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <button
          onClick={next}
          disabled={index === max}
          className={`absolute -right-4 sm:-right-6 z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-[#3730a3] bg-white/30 backdrop-blur-sm flex items-center justify-center ${
            index === max ? "opacity-40 cursor-not-allowed" : ""
          }`}>
          <svg
            width="14"
            height="14"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e1b4b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5 flex-wrap">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="h-2 rounded-full transition-all duration-200"
            style={{
              width: i === index ? 24 : 8,
              background: i === index ? "#3730a3" : "#c4a0ad",
            }}
          />
        ))}
      </div>
    </div>
  );
}
