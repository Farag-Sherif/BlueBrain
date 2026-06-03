import { useState, useEffect, useRef } from "react";
import "./AIBoothDesigner.css";
import axios from "axios";
import { useLang } from "../../i18n/LanguageContext";

// Point this to your actual backend API endpoint
const AI_API_URL = "/api/get-ai";

const formatCurrency = (amount, lang) => {
  if (!amount) return "";
  if (typeof amount === "string") {
    if (amount.includes("EGP") || amount.includes("ج.م") || amount.includes("$")) return amount;
    return lang === "ar" ? `${amount} ج.م` : `${amount} EGP`;
  }
  return lang === "ar" 
    ? `${amount.toLocaleString()} ج.م` 
    : `${amount.toLocaleString()} EGP`;
};

/* ─── Static Data ────────────────────────────────────────────────────────── */
const BOOTH_TYPES = [
  { id: "inline",   label: "Inline Booth",   icon: "▬", desc: "One open side" },
  { id: "corner",   label: "Corner Booth",   icon: "◸", desc: "Two open sides" },
  { id: "peninsula",label: "Peninsula Booth",icon: "⬓", desc: "Three open sides" },
  { id: "island",   label: "Island Booth",   icon: "⬜", desc: "Four open sides" },
];

const FEATURES_LIST = [
  { id: "led",      label: "LED Screen",       icon: "🖥️" },
  { id: "reception",label: "Reception Counter",icon: "🛎️" },
  { id: "meeting",  label: "Meeting Room",     icon: "🤝" },
  { id: "storage",  label: "Storage Room",     icon: "📦" },
  { id: "double",   label: "Double Deck",      icon: "🏗️" },
];

const STYLES = ["Modern","Luxury","Minimalist","Technology","Corporate"];
const INDUSTRIES = ["Technology","Healthcare","Automotive","Real Estate","Retail","Finance","Food & Beverage","Fashion","Education","Energy"];

const CONCEPTS = [
  {
    id:1, title:"Azure Horizon",
    style:"Modern", img:"/booth_concept_1.png",
    desc:"A sleek open-plan booth with full-height LED wall and floating reception counter. Clean lines meet dynamic lighting.",
    features:["LED Wall 5×3m","Floating Counter","Backlit Logo","Interactive Kiosk"],
    price:"925,000",basePrice:925000,
  },
  {
    id:2, title:"Golden Prestige",
    style:"Luxury", img:"/booth_concept_2.png",
    desc:"An opulent double-height structure featuring gold-anodised framing, crystal shelving, and a private VIP lounge.",
    features:["VIP Meeting Room","Gold Cladding","Crystal Displays","Premium Lighting"],
    price:"1,710,000",basePrice:1710000,
  },
  {
    id:3, title:"Pure Canvas",
    style:"Minimalist", img:"/booth_concept_3.png",
    desc:"Less is more. White tensioned fabric, natural timber accents, and diffused ambient lighting for an open, airy feel.",
    features:["Fabric Walls","Timber Accents","Ambient Glow","Open Layout"],
    price:"645,000",basePrice:645000,
  },
  {
    id:4, title:"Nexus Deck",
    style:"Technology", img:"/booth_concept_4.png",
    desc:"Futuristic double-deck configuration with holographic projection zones and an upper-level executive meeting suite.",
    features:["Double Deck","Hologram Zone","Upper Suite","Smart Lighting"],
    price:"2,390,000",basePrice:2390000,
  },
];

const WHY_FEATURES = [
  { icon:"⚡", title:"Instant Concepts", desc:"Get 4 unique booth design concepts generated in seconds using advanced AI algorithms trained on thousands of exhibition projects." },
  { icon:"💡", title:"Smart Cost Estimation", desc:"Receive accurate, real-time pricing based on your dimensions, features, and market data — no guesswork involved." },
  { icon:"🎨", title:"Multiple Design Options", desc:"Explore diverse styles from minimalist to luxury. Compare concepts side by side and pick the perfect match." },
  { icon:"🚀", title:"Faster Project Planning", desc:"Cut planning time by 80%. Share AI concepts with your team and clients for instant feedback and approval." },
];

const TESTIMONIALS = [
  {
    name:"Sarah Mitchell",
    company:"TechVision Group",
    avatar:"SM",
    color:"#125EF2",
    text:"The AI designer saved us three weeks of back-and-forth with vendors. We had a stunning concept ready in minutes and our client was blown away at the presentation.",
  },
  {
    name:"Omar Al-Rashidi",
    company:"Apex Exhibitions LLC",
    avatar:"OA",
    color:"#7C3AED",
    text:"I was skeptical at first, but the cost estimation was remarkably accurate. The final booth came in within 5% of the AI-generated quote. Incredible tool.",
  },
  {
    name:"Elena Voronova",
    company:"Nordic Brands GmbH",
    avatar:"EV",
    color:"#059669",
    text:"As a brand manager overseeing 12 shows a year, this has completely transformed our workflow. The quality of concepts rivals our in-house design team.",
  },
];

/* ─── Animated Counter ───────────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Range Slider ───────────────────────────────────────────────────────── */
function RangeSlider({ value, onChange, min, max, step, formatLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="abd-range-wrap">
      <input
        type="range" min={min} max={max} step={step}
        value={value} onChange={e => onChange(Number(e.target.value))}
        className="abd-range"
        style={{ background: `linear-gradient(to right, #125EF2 ${pct}%, #e2e8f0 ${pct}%)` }}
      />
      <div className="abd-range-labels">
        <span>{formatLabel(min)}</span>
        <span className="abd-range-val">{formatLabel(value)}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </div>
  );
}

/* ─── Color Picker ───────────────────────────────────────────────────────── */
const PALETTE = ["#125EF2","#0F172A","#F8FAFC","#7C3AED","#059669","#DC2626","#D97706","#EC4899","#06B6D4","#84CC16"];
function ColorPicker({ selected, onChange }) {
  const { lang } = useLang();
  return (
    <div className="abd-color-picker">
      {PALETTE.map(c => (
        <button
          key={c} type="button"
          className={`abd-color-dot${selected.includes(c) ? " active" : ""}`}
          style={{ background: c }}
          onClick={() => onChange(
            selected.includes(c) ? selected.filter(x => x !== c)
              : selected.length < 3 ? [...selected, c] : selected
          )}
          title={c}
        />
      ))}
      <span className="abd-color-hint">
        {selected.length}/3 {lang === "ar" ? "محددة" : "selected"}
      </span>
    </div>
  );
}

/* ─── Floating Particles ─────────────────────────────────────────────────── */
function Particles() {
  return (
    <div className="abd-particles" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="abd-particle" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 8}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          opacity: 0.15 + Math.random() * 0.3,
        }} />
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AIBoothDesigner() {
  const { lang, t } = useLang();
  const [step, setStep] = useState(1); // 1–5 form steps
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);

  // Form state (Default budget is set to 1,000,000 EGP)
  const [width, setWidth] = useState(6);
  const [depth, setDepth] = useState(4);
  const [height, setHeight] = useState(3);
  const [boothType, setBoothType] = useState("modern");
  const [designStyle, setDesignStyle] = useState("Modern");
  const [colors, setColors] = useState(["#125EF2"]);
  const [industry, setIndustry] = useState("Technology");
  const [features, setFeatures] = useState([]);
  const [budget, setBudget] = useState(1000000);
  const [notes, setNotes] = useState("");

  const resultsRef = useRef(null);
  const formRef = useRef(null);

  function toggleFeature(id) {
    setFeatures(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  }

  function handleGenerate() {
    setGenerating(true);
    setError(null);
    setProgress(0);
    
    // Animate progress up to 90% while waiting for API
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 8;
      if (p >= 90) {
        p = 90;
        clearInterval(timer);
      }
      setProgress(Math.min(p, 90));
    }, 200);

    const payload = {
      width,
      depth,
      height,
      boothType,
      designStyle,
      colors,
      industry,
      features,
      budget,
      notes
    };

    // Calling the backend API for AI generation
    axios.post(AI_API_URL, payload)
      .then(response => {
        clearInterval(timer);
        const generatedConcepts = response.data.concepts || response.data;
        
        setProgress(100);
        setTimeout(() => {
          setGenerating(false);
          setResults(generatedConcepts);
          setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, 500);
      })
      .catch(err => {
        clearInterval(timer);
        console.warn("API Error, falling back to scaled EGP mock concepts:", err);
        
        // Dynamically scale EGP mock concepts based on size for a realistic preview
        const scaledConcepts = CONCEPTS.map(c => {
          const areaRatio = (width * depth) / 24;
          const estimatedCost = Math.round(c.basePrice * areaRatio);
          return {
            ...c,
            price: formatCurrency(estimatedCost, lang),
            basePrice: estimatedCost
          };
        });

        setProgress(100);
        setTimeout(() => {
          setGenerating(false);
          setResults(scaledConcepts);
          setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, 500);
      });
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Pricing breakdown (Coefficients scaled for EGP: 60,000 EGP per sq m, 40,000 EGP per m height)
  const base = results ? Math.round((width * depth * 60000) + (height * 40000)) : 0;
  const featureCost = 0; // No extra cost for features!
  const total = base;

  const STEPS = [
    t.aiBooth.steps.dimensions,
    t.aiBooth.steps.boothType,
    t.aiBooth.steps.styleIndustry,
    t.aiBooth.steps.features,
    t.aiBooth.steps.budgetNotes
  ];

  return (
    <div className="abd-root">
     
        

      {/* ── FORM SECTION ─────────────────────────────────────────────────── */}
      <section className="abd-form-section" ref={formRef} id="form-section">
        <div className="abd-section-header">
          <div className="abd-section-badge">{t.aiBooth.configureBadge}</div>
          <h2 className="abd-section-title">{t.aiBooth.tellAiTitle}</h2>
          <p className="abd-section-desc">{t.aiBooth.tellAiDesc}</p>
        </div>

        {/* Step Progress */}
        <div className="abd-stepper">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`abd-step${step === i + 1 ? " active" : ""}${step > i + 1 ? " done" : ""}`}
              onClick={() => setStep(i + 1)}
            >
              <div className="abd-step-num">{step > i + 1 ? "✓" : i + 1}</div>
              <span className="abd-step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="abd-form-wrap">
          {/* ── Step 1: Dimensions */}
          {step === 1 && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.dimensions.title}</h3>
              <p className="abd-step-subtitle">{t.aiBooth.dimensions.subtitle}</p>
              <div className="abd-dims-grid">
                {[
                  { label: t.aiBooth.dimensions.width, val:width, set:setWidth, icon:"↔️" },
                  { label: t.aiBooth.dimensions.depth, val:depth, set:setDepth, icon:"↕️" },
                  { label: t.aiBooth.dimensions.height, val:height, set:setHeight, icon:"↑" },
                ].map(d => (
                  <div className="abd-dim-card" key={d.label}>
                    <div className="abd-dim-icon">{d.icon}</div>
                    <label className="abd-label">{d.label} (m)</label>
                    <div className="abd-dim-controls">
                      <button type="button" className="abd-dim-btn" onClick={() => d.set(v => Math.max(1, v - 0.5))}>−</button>
                      <input
                        type="number" className="abd-dim-input" value={d.val} min={1} max={50} step={0.5}
                        onChange={e => d.set(Number(e.target.value))}
                      />
                      <button type="button" className="abd-dim-btn" onClick={() => d.set(v => Math.min(50, v + 0.5))}>+</button>
                    </div>
                    <div className="abd-dim-area">
                      {d.label === t.aiBooth.dimensions.width ? `${width}m × ${depth}m = ${(width * depth).toFixed(1)} m²` : `${d.val}m`}
                    </div>
                  </div>
                ))}
              </div>
              <div className="abd-area-summary">
                <div className="abd-area-box">
                  <span>{t.aiBooth.dimensions.totalFloorArea}</span>
                  <strong>{(width * depth).toFixed(1)} m²</strong>
                </div>
                <div className="abd-area-box">
                  <span>{t.aiBooth.dimensions.volume}</span>
                  <strong>{(width * depth * height).toFixed(1)} m³</strong>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Booth Type */}
          {step === 2 && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.boothTypes.title}</h3>
              <p className="abd-step-subtitle">{t.aiBooth.boothTypes.subtitle}</p>
              <div className="abd-type-grid">
                {BOOTH_TYPES.map(bt => (
                  <button
                    key={bt.id} type="button"
                    className={`abd-type-card${boothType === bt.id ? " selected" : ""}`}
                    onClick={() => setBoothType(bt.id)}
                  >
                    <div className="abd-type-icon">{bt.icon}</div>
                    <div className="abd-type-name">{t.aiBooth.boothTypes[bt.id]?.label || bt.label}</div>
                    <div className="abd-type-desc">{t.aiBooth.boothTypes[bt.id]?.desc || bt.desc}</div>
                    <div className={`abd-type-check${boothType === bt.id ? " visible" : ""}`}>✓</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Style & Industry */}
          {step === 3 && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.preferences.title}</h3>
              <p className="abd-step-subtitle">{t.aiBooth.preferences.subtitle}</p>

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.preferences.styleLabel}</label>
                <div className="abd-style-pills">
                  {STYLES.map(s => (
                    <button
                      key={s} type="button"
                      className={`abd-pill${designStyle === s ? " active" : ""}`}
                      onClick={() => setDesignStyle(s)}
                    >{t.aiBooth.preferences.styles[s] || s}</button>
                  ))}
                </div>
              </div>

              <div className="abd-field">
                <label className="abd-label">
                  {t.aiBooth.preferences.colorsLabel} <small>({t.aiBooth.preferences.colorsHint})</small>
                </label>
                <ColorPicker selected={colors} onChange={setColors} />
                <div className="abd-selected-colors">
                  {colors.map(c => (
                    <div key={c} className="abd-color-tag">
                      <span style={{ background: c, width: 14, height: 14, borderRadius: "50%", display: "inline-block" }} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.preferences.industryLabel}</label>
                <select
                  className="abd-select"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                >
                  {INDUSTRIES.map(i => {
                    const key = i.replace(/\s+/g, "").replace("&", "");
                    return <option key={i} value={i}>{t.aiBooth.preferences.industries[key] || i}</option>;
                  })}
                </select>
              </div>
            </div>
          )}

          {/* ── Step 4: Features */}
          {step === 4 && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.features.title}</h3>
              <p className="abd-step-subtitle">{t.aiBooth.features.subtitle}</p>
              <div className="abd-features-grid">
                {FEATURES_LIST.map(f => (
                  <button
                    key={f.id} type="button"
                    className={`abd-feature-card${features.includes(f.id) ? " selected" : ""}`}
                    onClick={() => toggleFeature(f.id)}
                  >
                    <div className="abd-feature-icon">{f.icon}</div>
                    <div className="abd-feature-label">{t.aiBooth.features.items[f.id] || f.label}</div>
                    <div className={`abd-feature-check${features.includes(f.id) ? " visible" : ""}`}>✓</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 5: Budget & Notes */}
          {step === 5 && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.budgetNotes.title}</h3>
              <p className="abd-step-subtitle">{t.aiBooth.budgetNotes.subtitle}</p>

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.budgetNotes.budgetLabel}</label>
                <RangeSlider
                  value={budget} onChange={setBudget}
                  min={100000} max={5000000} step={50000}
                  formatLabel={v => lang === "ar" ? `${(v / 1000).toLocaleString()} ألف ج.م` : `${(v / 1000).toLocaleString()}k EGP`}
                />
              </div>

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.budgetNotes.notesLabel}</label>
                <textarea
                  className="abd-textarea"
                  rows={5}
                  placeholder={t.aiBooth.budgetNotes.notesPlaceholder}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <div className="abd-summary-preview">
                <h4>{t.aiBooth.budgetNotes.summaryTitle}</h4>
                <div className="abd-summary-grid">
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.size}</span><strong>{width}m × {depth}m × {height}m</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.type}</span><strong>{t.aiBooth.boothTypes[boothType]?.label || boothType}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.style}</span><strong>{t.aiBooth.preferences.styles[designStyle] || designStyle}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.industry}</span><strong>{t.aiBooth.preferences.industries[industry.replace(/\s+/g, "").replace("&", "")] || industry}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.features}</span><strong>{features.length > 0 ? features.map(fid => t.aiBooth.features.items[fid] || fid).join(", ") : (lang === "ar" ? "لا يوجد" : "None")}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.budget}</span><strong>{formatCurrency(budget, lang)}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="abd-form-nav">
            {step > 1 && (
              <button type="button" className="abd-btn-outline" onClick={() => setStep(s => s - 1)}>
                {t.aiBooth.nav.back}
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 5 ? (
              <button type="button" className="abd-btn-primary" onClick={() => setStep(s => s + 1)} id={`next-step-${step}`}>
                {t.aiBooth.nav.continue}
              </button>
            ) : (
              <button
                type="button"
                className="abd-btn-generate"
                onClick={handleGenerate}
                id="generate-btn"
              >
                <span className="abd-generate-icon">✦</span>
                {t.aiBooth.nav.generate}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── AI PROCESSING ────────────────────────────────────────────────── */}
      {generating && (
        <section className="abd-processing">
          <div className="abd-processing-inner">
            <div className="abd-ai-orb">
              <div className="abd-orb-ring abd-orb-ring-1" />
              <div className="abd-orb-ring abd-orb-ring-2" />
              <div className="abd-orb-ring abd-orb-ring-3" />
              <div className="abd-orb-core">✦</div>
            </div>
            <h3 className="abd-processing-title">{t.aiBooth.processing.title}</h3>
            <p className="abd-processing-sub">
              {progress < 30 ? t.aiBooth.processing.status[0]
                : progress < 60 ? t.aiBooth.processing.status[1]
                : progress < 85 ? t.aiBooth.processing.status[2]
                : t.aiBooth.processing.status[3]}
            </p>
            <div className="abd-progress-track">
              <div className="abd-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="abd-progress-pct">{Math.round(progress)}%</div>
            <div className="abd-processing-tags">
              {["dimensions", "boothType", "designStyle", "features", "pricing"].map((tagKey, i) => (
                <span
                  key={tagKey}
                  className={`abd-proc-tag${progress > i * 20 ? " done" : ""}`}
                >{progress > i * 20 ? "✓ " : ""}{t.aiBooth.processing.tags[tagKey]}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ──────────────────────────────────────────────────────── */}
      {results && !generating && (
        <section className="abd-results" ref={resultsRef} id="results-section">
          <div className="abd-section-header">
            <div className="abd-section-badge abd-badge-success">
              ✓ 4 {lang === "ar" ? "تصميمات تم توليدها" : "Concepts Generated"}
            </div>
            <h2 className="abd-section-title">{t.aiBooth.results.title}</h2>
            <p className="abd-section-desc">
              {lang === "ar" 
                ? `بناءً على أبعاد ومواصفات جناحك بمقاس ${width}م × ${depth}م، قام الذكاء الاصطناعي بتوليد 4 مفاهيم تصميم فريدة.` 
                : `Based on your ${width}m × ${depth}m booth requirements, our AI has generated 4 unique concepts.`}
            </p>
          </div>

          <div className="abd-results-grid">
            {results.map((c) => (
              <div
                key={c.id}
                className={`abd-concept-card${selectedCard === c.id ? " selected" : ""}`}
                onClick={() => setSelectedCard(c.id)}
                id={`concept-card-${c.id}`}
              >
                <div className="abd-concept-img-wrap">
                  <img src={c.img} alt={c.title} className="abd-concept-img" />
                  <div className="abd-concept-style-badge">
                    {t.aiBooth.preferences.styles[c.style] || c.style}
                  </div>
                  <div className="abd-concept-price-badge">{formatCurrency(c.price, lang)}</div>
                </div>
                <div className="abd-concept-body">
                  <h3 className="abd-concept-title">{c.title}</h3>
                  <p className="abd-concept-desc">{c.desc}</p>
                  <ul className="abd-concept-features">
                    {c.features.map(f => (
                      <li key={f}><span className="abd-feat-dot">✦</span>{f}</li>
                    ))}
                  </ul>
                  <div className="abd-concept-footer">
                    <div className="abd-concept-price-full">
                      <span>{t.aiBooth.results.estimatedCost}</span>
                      <strong>{formatCurrency(c.price, lang)}</strong>
                    </div>
                    <button
                      className="abd-btn-view"
                      id={`view-details-${c.id}`}
                      onClick={e => { e.stopPropagation(); setSelectedCard(c.id); }}
                    >
                      {selectedCard === c.id ? t.aiBooth.results.selected : t.aiBooth.results.viewDetails}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Pricing Panel */}
          <div className="abd-pricing-panel">
            <div className="abd-pricing-glass">
              <div className="abd-pricing-header">
                <div className="abd-pricing-icon">💰</div>
                <div>
                  <h3>{t.aiBooth.results.pricingTitle}</h3>
                  <p>{t.aiBooth.results.pricingSubtitle} {width}m × {depth}m × {height}m</p>
                </div>
              </div>
              <div className="abd-pricing-rows">
                <div className="abd-pricing-row">
                  <span>{t.aiBooth.results.baseCost}</span>
                  <span className="abd-price-val">{formatCurrency(base, lang)}</span>
                </div>
                <div className="abd-pricing-row">
                  <span>{t.aiBooth.results.optionalFeatures} ({features.length} {lang === "ar" ? "محددة" : "selected"})</span>
                  <span className="abd-price-val">{t.aiBooth.features.included}</span>
                </div>
                <div className="abd-pricing-row abd-pricing-row-sub">
                  <span className="abd-pricing-sub-label">{t.aiBooth.results.designPm}</span>
                  <span className="abd-price-val-sub">{t.aiBooth.features.included}</span>
                </div>
                <div className="abd-pricing-row abd-pricing-row-sub">
                  <span className="abd-pricing-sub-label">{t.aiBooth.results.visuals3d}</span>
                  <span className="abd-price-val-sub">{t.aiBooth.features.included}</span>
                </div>
              </div>
              <div className="abd-pricing-divider" />
              <div className="abd-pricing-total">
                <span>{t.aiBooth.results.totalCost}</span>
                <strong>{formatCurrency(total, lang)}</strong>
              </div>
              <div className="abd-pricing-note">
                {t.aiBooth.results.note}
              </div>
              <div className="abd-pricing-actions">
                <button className="abd-btn-primary" style={{ width: "100%" }} id="request-quote-btn">
                  {t.aiBooth.results.requestBtn}
                </button>
                <button
                  className="abd-btn-outline" style={{ width: "100%" }}
                  onClick={() => { setResults(null); setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  id="new-design-btn"
                >
                  {t.aiBooth.results.newDesignBtn}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}


    </div>
  );
}
