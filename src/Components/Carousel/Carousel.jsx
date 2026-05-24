import { useState, useRef, useEffect, useCallback } from "react";

const GAP = 20;

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
    <div dir="ltr" className="relative pb-6">
      <div className="relative flex items-center group/carousel">
        {/* Left arrow button */}
        <button 
          onClick={prev} 
          disabled={index === 0}
          aria-label="Previous slide"
          className={`absolute -left-4 sm:-left-6 z-10 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-blue-200 glass flex items-center justify-center transition-all duration-300 shadow-lg ${
            index === 0 
              ? "opacity-0 invisible" 
              : "opacity-0 group-hover/carousel:opacity-100 hover:scale-110 hover:bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700"
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Track */}
        <div ref={trackRef} className="overflow-x-hidden w-full py-10 px-2 -mx-2">
          <div className="flex transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{ gap: GAP, transform: `translateX(-${offset}px)` }}>
            {items.map((child, i) => (
              <div key={i} style={{ width: cardWidth, flexShrink: 0 }} className="h-full">
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow button */}
        <button 
          onClick={next} 
          disabled={index === max} 
          aria-label="Next slide"
          className={`absolute -right-4 sm:-right-6 z-10 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-blue-200 glass flex items-center justify-center transition-all duration-300 shadow-lg ${
            index === max 
              ? "opacity-0 invisible" 
              : "opacity-0 group-hover/carousel:opacity-100 hover:scale-110 hover:bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700"
          }`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-2 flex-wrap">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-blue-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
