import { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";

export default function ContactUs() {
  const { t, lang, api } = useLang();
  const c = t.contact;

  const [branches, setBranches] = useState([]);
  const [about, setAbout] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [branchesData, settingsData] = await Promise.all([
        api.getBranches(),
        api.getSettings(),
      ]);
      setBranches(branchesData);
      setAbout(settingsData);
      setLoading(false);
    };
    fetchAll();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <>
      <Title>{c.pageTitle}</Title>
      <div className="container mx-auto px-5 py-10">
        {/* MAPS */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {branches.map((branch, i) => (
            <div key={i} className="h-64 rounded-xl overflow-hidden shadow-xl">
              <iframe
                title={branch.name}
                src={branch.map_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT INFO */}
          <div className="flex flex-col gap-6">
            {about && (
              <InfoCard
                title={c.openingHours}
                items={c.openingItems.map((text) => ({ icon: "🕐", text }))}
              />
            )}
            {branches.map((branch, i) => (
              <InfoCard
                key={i}
                title={branch.name}
                items={[
                  { icon: "🏢", text: branch.address },
                  { icon: "📞", text: branch.phone },
                  { icon: "✉️", text: branch.email },
                ]}
              />
            ))}
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-3xl font-extrabold mainC mb-2">
              {c.getInTouch}
            </h2>
            <p className="text-sm text-gray-500 mb-6">{c.getInTouchSub}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-5">
      <h3 className="font-bold mainC mb-3 border-b-2 border-indigo-600 inline-block">
        {title}
      </h3>
      <div className="flex flex-col gap-2 mt-2 text-sm text-gray-700">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const { t, api } = useLang();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const res = await api.sendContact({
        name: form.name,
        email: form.email,
        message: form.message,
      });
      if (res.status) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
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
      {[
        [c.nameLabel, "name", "text"],
        [c.emailLabel, "email", "email"],
      ].map(([label, key, type]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type={type}
            value={form[key]}
            onChange={handle(key)}
            className="w-full px-3 py-2 border border-indigo-200 rounded-md outline-none focus:border-indigo-600"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {c.messageLabel}
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={handle("message")}
          className="w-full px-3 py-2 border border-indigo-200 rounded-md outline-none focus:border-indigo-600"
        />
      </div>
      {sent ? (
        <div className="text-center text-green-600 font-semibold">
          {c.successMsg}
        </div>
      ) : (
        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3 main text-white rounded-full font-semibold hover:scale-105 transition disabled:opacity-50">
          {loading ? c.sending : c.sendBtn}
        </button>
      )}
    </div>
  );
}
