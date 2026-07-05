import { useState, useEffect, useRef } from "react";
import "./AIBoothDesigner.css";
import axios from "axios";
import { useLang } from "../../i18n/LanguageContext";

// Point this to your actual backend API endpoint
const AI_API_URL = "/api/get-ai";

const formatCurrency = (amount, lang) => {
  if (!amount) return "";
  if (typeof amount === "string") {
    if (amount.includes("EGP") || amount.includes("ج.م") || amount.includes("$") || amount.includes("دولار")) return amount;
    return lang === "ar" ? `${amount} دولار` : `$${amount}`;
  }
  return lang === "ar" 
    ? `${amount.toLocaleString()} دولار` 
    : `$${amount.toLocaleString()}`;
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
  const [step, setStep] = useState(1); // 1–6 form steps
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [error, setError] = useState(null);
  const [logoBase64, setLogoBase64] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  // Form state (Default budget is set to 1,000,000 EGP)
  const [width, setWidth] = useState(6);
  const [depth, setDepth] = useState(4);
  const [height, setHeight] = useState(3);
  const [boothType, setBoothType] = useState("modern");
  const [designStyle, setDesignStyle] = useState("Modern");
  const [colors, setColors] = useState(["#125EF2"]);
  const [industry, setIndustry] = useState("Technology");
  const [features, setFeatures] = useState([]);
  const [budget, setBudget] = useState(10000);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const formRef = useRef(null);

  function toggleFeature(id) {
    setFeatures(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  }

  function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmitRequest() {
    setIsSubmitting(true);
    setError(null);

    const featureMapping = {
      led: "led_screen",
      reception: "reception_counter",
      meeting: "meeting_room",
      storage: "storage_room",
      double: "double_deck"
    };

    const formData = new FormData();
    formData.append("width_m", width);
    formData.append("depth_m", depth);
    formData.append("height_m", height);
    formData.append("booth_type", boothType.toLowerCase());
    formData.append("design_style", designStyle.toLowerCase());
    formData.append("industry_type", industry);
    formData.append("color_primary", colors[0] || "#125EF2");
    formData.append("color_secondary", colors[1] || "#FFFFFF");
    formData.append("color_tertiary", colors[2] || "#000000");
    formData.append("budget", budget);
    formData.append("additional_notes", notes);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("company", company);

    const mappedFeatures = features.map(f => featureMapping[f] || f);
    mappedFeatures.forEach(f => {
      formData.append("features[]", f);
    });

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      const response = await axios.post("https://dashbaord.bluebrain-co.com/api/booth-configurations", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(response);
      setSubmitSuccess(true);
      if (response.data && response.data.reference_number) {
        setReferenceNumber(response.data.reference_number);
      }
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } catch (err) {
      console.error("API Error during submission:", err);
      if (err.response && err.response.data) {
        console.error("Validation Details:", err.response.data);
      }
      setError(lang === "ar" ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى." : "An error occurred while submitting the request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }



  const STEPS = [
    t.aiBooth.steps.dimensions,
    t.aiBooth.steps.boothType,
    t.aiBooth.steps.styleIndustry,
    t.aiBooth.steps.features,
    t.aiBooth.steps.budgetNotes,
    t.aiBooth.steps.review || (lang === "ar" ? "مراجعة وتقديم" : "Review & Submit")
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

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.submit?.brandLogo || (lang === "ar" ? "شعار العلامة التجارية" : "Brand Logo")}</label>
                <input 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.svg" 
                  onChange={handleLogoUpload} 
                  className="abd-input" 
                  style={{ padding: "0.5rem", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                />
                {logoBase64 && (
                  <div style={{ marginTop: "10px" }}>
                    <img src={logoBase64} alt="Brand Logo Preview" style={{ maxWidth: "150px", maxHeight: "100px", borderRadius: "8px", objectFit: "contain" }} />
                  </div>
                )}
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
                <label className="abd-label">{lang === "ar" ? "الاسم" : "Name"}</label>
                <input
                  type="text"
                  className="abd-input"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  placeholder={lang === "ar" ? "أدخل اسمك" : "Enter your name"}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="abd-field">
                <label className="abd-label">{lang === "ar" ? "رقم الهاتف" : "Phone"}</label>
                <input
                  type="tel"
                  className="abd-input"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  placeholder={lang === "ar" ? "أدخل رقم الهاتف" : "Enter your phone number"}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="abd-field" style={{ marginBottom: "2rem" }}>
                <label className="abd-label">{lang === "ar" ? "الشركة" : "Company"}</label>
                <input
                  type="text"
                  className="abd-input"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  placeholder={lang === "ar" ? "أدخل اسم الشركة" : "Enter your company name"}
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>

              <div className="abd-field">
                <label className="abd-label">{t.aiBooth.budgetNotes.budgetLabel}</label>
                <RangeSlider
                  value={budget} onChange={setBudget}
                  min={1000} max={50000} step={1000}
                  formatLabel={v => lang === "ar" ? `$${(v / 1000).toLocaleString()}k` : `$${(v / 1000).toLocaleString()}k`}
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

              <div className="abd-summary-preview" style={{ opacity: 0.5 }}>
                <p><i>{(lang === "ar" ? "سيتم عرض الملخص في الخطوة القادمة." : "Summary will be shown in the next step.")}</i></p>
              </div>
            </div>
          )}

          {/* ── Step 6: Review & Submit */}
          {step === 6 && !submitSuccess && (
            <div className="abd-form-step animate-fadeInUp">
              <h3 className="abd-step-title">{t.aiBooth.submit?.reviewSubmit || (lang === "ar" ? "مراجعة وتقديم" : "Review & Submit")}</h3>
              
              <div className="abd-summary-preview" style={{ marginBottom: "2rem" }}>
                <h4>{t.aiBooth.budgetNotes.summaryTitle}</h4>
                
                {logoBase64 && (
                  <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                    <img src={logoBase64} alt="Brand Logo" style={{ maxWidth: "150px", maxHeight: "100px", objectFit: "contain", background: "#fff", padding: "8px", borderRadius: "8px" }} />
                  </div>
                )}

                <div className="abd-summary-grid">
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.size}</span><strong>{width}m × {depth}m × {height}m</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.type}</span><strong>{t.aiBooth.boothTypes[boothType]?.label || boothType}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.style}</span><strong>{t.aiBooth.preferences.styles[designStyle] || designStyle}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.industry}</span><strong>{t.aiBooth.preferences.industries[industry.replace(/\s+/g, "").replace("&", "")] || industry}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.features}</span><strong>{features.length > 0 ? features.map(fid => t.aiBooth.features.items[fid] || fid).join(", ") : (lang === "ar" ? "لا يوجد" : "None")}</strong></div>
                  <div><span>{t.aiBooth.budgetNotes.summaryGrid.budget}</span><strong>{formatCurrency(budget, lang)}</strong></div>
                </div>
                {notes && (
                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <span style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.aiBooth.budgetNotes.notesLabel}:</span>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>{notes}</p>
                  </div>
                )}
              </div>

              <div className="abd-submit-notice" style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "1.1rem", color: "#334155", fontWeight: "500" }}>
                  {t.aiBooth.submit?.manualReviewNote || (lang === "ar" ? "سيتم إعداد عرض السعر النهائي يدوياً بواسطة فريق Blue Brain بعد مراجعة متطلباتك." : "Final quotation will be prepared manually by the Blue Brain team after reviewing your requirements.")}
                </p>
              </div>

              {error && (
                <div style={{ padding: "1rem", background: "#fef2f2", color: "#ef4444", borderRadius: "8px", marginBottom: "1.5rem", textAlign: "center" }}>
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {submitSuccess && (
            <div className="abd-form-step animate-fadeInUp" style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
              <h3 className="abd-step-title">{t.aiBooth.submit?.submitSuccess || (lang === "ar" ? "تم تقديم الطلب بنجاح!" : "Request submitted successfully!")}</h3>
              {referenceNumber && (
                <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#475569" }}>
                  {lang === "ar" ? "رقم المرجع:" : "Reference Number:"} <strong>{referenceNumber}</strong>
                </p>
              )}
              <p style={{ marginTop: "1.5rem", color: "#64748b" }}>
                {t.aiBooth.submit?.manualReviewNote || (lang === "ar" ? "سيتم إعداد عرض السعر النهائي يدوياً بواسطة فريق Blue Brain بعد مراجعة متطلباتك." : "Final quotation will be prepared manually by the Blue Brain team after reviewing your requirements.")}
              </p>
              <button 
                className="abd-btn-outline" 
                style={{ marginTop: "2rem" }}
                onClick={() => window.location.reload()}
              >
                {t.aiBooth.results.newDesignBtn}
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {!submitSuccess && (
            <div className="abd-form-nav">
              {step > 1 && (
                <button type="button" className="abd-btn-outline" onClick={() => setStep(s => s - 1)}>
                  {t.aiBooth.nav.back}
                </button>
              )}
              <div style={{ flex: 1 }} />
              {step < 6 ? (
                <button type="button" className="abd-btn-primary" onClick={() => setStep(s => s + 1)} id={`next-step-${step}`}>
                  {t.aiBooth.nav.continue}
                </button>
              ) : (
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    className="abd-btn-generate"
                    disabled
                    title={t.aiBooth.submit?.aiGenerationComingSoon || (lang === "ar" ? "تصميم الذكاء الاصطناعي - قريباً" : "AI Design Generation - Coming Soon")}
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  >
                    <span className="abd-generate-icon">✦</span>
                    {t.aiBooth.submit?.comingSoon || (lang === "ar" ? "قريباً" : "Coming Soon")}
                  </button>

                  <button
                    type="button"
                    className="abd-btn-primary"
                    onClick={handleSubmitRequest}
                    disabled={isSubmitting}
                    id="submit-request-btn"
                  >
                    {isSubmitting ? (lang === "ar" ? "جاري الإرسال..." : "Submitting...") : (t.aiBooth.submit?.submitRequest || (lang === "ar" ? "تقديم الطلب" : "Submit Request"))}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>




    </div>
  );
}
