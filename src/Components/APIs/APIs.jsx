// conomants/APIs/APIs.js
import axios from "axios";

const BASE_URL = "https://dashbaord.bluebrain-co.com";

/* ───────── Create client with dynamic lang ───────── */
const createClient = (lang = "en") =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/json",
      "Accept-Language": lang,
    },
  });

/* ───────── SAFE GET → Array response ───────── */
const get = async (endpoint, lang, fallback = []) => {
  try {
    const client = createClient(lang);
    const { data } = await client.get(endpoint);

    if (!data?.status || !Array.isArray(data?.data) || data.data.length === 0) {
      return fallback;
    }

    return data.data;
  } catch (err) {
    return fallback;
  }
};

/* ───────── SAFE GET → Object response ───────── */
const getOne = async (endpoint, lang, fallback = null) => {
  try {
    const client = createClient(lang);
    const { data } = await client.get(endpoint);

    if (!data?.status || !data?.data) {
      return fallback;
    }

    return data.data;
  } catch (err) {
    return fallback;
  }
};

/* ───────── POST ───────── */
const post = async (endpoint, body, lang = "en") => {
  const client = createClient(lang);
  const formData = new FormData();

  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });

  const { data: responseData } = await client.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return responseData;
};

/* ───────── API EXPORT ───────── */
export const createApi = (lang = "en") => ({
  getServices: () => get("/api/services", lang, []),
  getTeam: () => get("/api/team", lang, []),
  getProjects: () => get("/api/projects", lang, []),
  getBranches: () => get("/api/branches", lang, []),
  getClients: () => get("/api/clients", lang, []),
  getFaq: () => get("/api/faqs", lang, []),
  getSettings: () => getOne("/api/settings", lang, null),
  getProjectDetails: (id) => getOne(`/api/projects?tag_id=${id}`, lang, null),

  sendContact: (data) => post("/api/contact", data, lang),
  sendConsultation: (data) => post("/api/consultation", data, lang),
});
