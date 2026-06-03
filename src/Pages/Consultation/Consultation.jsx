import { useState, useRef, useEffect } from "react";
import Title from "../../Components/Title/Title";
import consultationVideo from "../../assets/Video/landing.mp4";
import { useLang } from "../../i18n/LanguageContext";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

export default function Consultation() {
  const { t } = useLang();
  const c = t.consultation;

  return (
    <>
      <Title>{c.pageTitle}</Title>
      <section className="container mx-auto my-10 px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal variant="fadeRight" delay="0ms">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <video
                className="w-full h-[400px] md:h-[500px]"
                src={consultationVideo}
                title="Consultation Video"
                controls
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeLeft" delay="150ms">
            <div className="p-8 md:p-10 bg-white drop-shadow-2xl rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#125EF2]">
                  {c.requestTitle}
                </h2>
              </div>
              <ConsultationForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

// ─── Custom Select ───────────────────────────────────────────────
function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm border-2 rounded-lg bg-white transition-all
          ${open ? "border-indigo-500 ring-2 ring-indigo-100" : "border-indigo-200 hover:border-indigo-400"}
          ${value ? "text-gray-800" : "text-gray-400"}`}>
        <span>{value || placeholder}</span>
        <svg
          className={`w-4 h-4 transition-transform text-gray-400 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((type) => (
            <div
              key={type}
              onClick={() => {
                onChange(type);
                setOpen(false);
              }}
              className={`flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors
                ${
                  value === type
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}>
              <span>{type}</span>
              {value === type && (
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7l4 4 6-6"
                    stroke="#4338ca"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Form ────────────────────────────────────────────────────────
function ConsultationForm() {
  const { t, api } = useLang();
  const c = t.consultation;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    consultation: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.phone || !form.type || !form.consultation) return;
    setLoading(true);
    try {
      const res = await api.sendConsultation(form);
      if (res.status) {
        setSent(true);
        setForm({ name: "", phone: "", type: "", consultation: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        alert(c.failMsg);
      }
    } catch {
      alert(c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={c.nameLabel}
          value={form.name}
          onChange={handle("name")}
        />
        <Input
          label={c.phoneLabel}
          value={form.phone}
          onChange={handle("phone")}
        />
      </div>

      <div>
        <label className="block text-md font-semibold text-gray-700 mb-3">
          {c.typeLabel}
        </label>
        <CustomSelect
          value={form.type}
          onChange={(val) => setForm((prev) => ({ ...prev, type: val }))}
          options={c.types}
          placeholder={c.typeDefault}
        />
      </div>

      <div>
        <label className="block text-md font-semibold text-gray-700 mb-3">
          {c.consultationLabel}
        </label>
        <textarea
          rows={4}
          value={form.consultation}
          onChange={handle("consultation")}
          placeholder={c.consultationPlaceholder}
          className="w-full border-2 border-indigo-200 rounded-md px-3 py-2 outline-none focus:border-indigo-600 resize-y"
        />
      </div>

      {sent ? (
        <p className="text-green-600 font-semibold text-center">
          {c.successMsg}
        </p>
      ) : (
        <button
          onClick={submit}
          disabled={loading}
          className="w-full main text-white py-3 rounded-2xl font-semibold transition hover:scale-105 disabled:opacity-50">
          {loading ? c.sending : c.sendBtn}
        </button>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-md font-semibold text-gray-700 mb-3">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="w-full border-2 border-indigo-200 rounded-md px-3 py-2 outline-none focus:border-indigo-600"
      />
    </div>
  );
}
