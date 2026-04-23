import { useState } from "react";
import Title from "../../Components/Title/Title";
import consultationVideo from "../../assets/Video/landing.mp4";
import { useLang } from "../../i18n/LanguageContext";

export default function Consultation() {
  const { t } = useLang();
  const c = t.consultation;

  return (
    <>
      <Title>{c.pageTitle}</Title>

      <section className="container mx-auto my-10 px-5 pb-20">
        {/* VIDEO */}
        <div className="relative mb-10 rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-[400px] md:h-[500px]"
            src={consultationVideo}
            title="Consultation Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 bg-white drop-shadow-2xl rounded-2xl mb-10">
          <div className="flex items-center gap-2 mb-10">
            <span className="text-2xl md:text-3xl lg:text-4xl">🎯</span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mainC">
              {c.requestTitle}
            </h2>
          </div>

          <ConsultationForm />
        </div>
      </section>
    </>
  );
}

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
      const res = await api.sendConsultation({
        name: form.name,
        phone: form.phone,
        type: form.type,
        consultation: form.consultation,
      });
      console.log(res);
      if (res.status) {
        setSent(true);
        setForm({ name: "", phone: "", type: "", consultation: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        alert(c.failMsg);
      }
    } catch (err) {
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
        <select
          value={form.type}
          onChange={handle("type")}
          className="w-full border-2 border-indigo-200 rounded-md px-3 py-2 outline-none focus:border-indigo-600 bg-white text-gray-700">
          <option value="">{c.typeDefault}</option>
          {c.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
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
