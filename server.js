import "./env.js";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import cors from "cors";
import "./env.js";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const PORT = Number(process.env.PORT) || 3000;

// Origens adicionais podem ser informadas no Render separadas por vírgula.
// Ex.: CORS_ALLOWED_ORIGINS=https://meu-frontend.vercel.app,http://localhost:5173
const allowedOrigins = new Set(
  (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean)
);

if (process.env.VERCEL_URL) {
  allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
}

const corsMiddleware = cors({
  origin(origin, callback) {
    // Chamadas server-to-server e ferramentas locais podem não enviar Origin.
    if (!origin) return callback(null, true);

    const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
    const isLocalDevelopment = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

    callback(null, allowedOrigins.has(origin) || isVercelPreview || isLocalDevelopment);
  },
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
});

let atualizacaoEmAndamento = false;

function atualizarDadosAutomaticamente() {
  if (atualizacaoEmAndamento) return;
  atualizacaoEmAndamento = true;
  const processo = spawn(process.execPath, [path.join(__dirname, "update-data.js")], { stdio: "inherit" });
  processo.on("close", codigo => {
    atualizacaoEmAndamento = false;
    if (codigo !== 0) console.error(`Atualização automática encerrada com código ${codigo}.`);
  });
  processo.on("error", erro => {
    atualizacaoEmAndamento = false;
    console.error("Falha na atualização automática:", erro.message);
  });
}

const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const TELEGRAM_ALERT_THRESHOLD = Number(process.env.TELEGRAM_ALERT_THRESHOLD || 60);
let ultimoAlertaTelegram = "";

async function enviarAlertaTelegram(mensagem) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: mensagem, parse_mode: "Markdown" }),
      signal: AbortSignal.timeout(10000)
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.description || "Telegram recusou a mensagem");
    console.log("Alerta enviado para o Telegram.");
    return true;
  } catch (error) {
    console.error("Falha no envio para o Telegram:", error.message);
    return false;
  }
}

async function avaliarAlertaTelegram(resultado) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  if (resultado.globalIndex < TELEGRAM_ALERT_THRESHOLD) {
    ultimoAlertaTelegram = "";
    return;
  }
  const assinatura = `${resultado.status}:${Math.round(resultado.globalIndex)}:${JSON.stringify(resultado.vectors)}`;
  if (assinatura === ultimoAlertaTelegram) return;
  const enviado = await enviarAlertaTelegram(`🚨 *ALERTA ANOMALIA*\n\nÍndice global: *${Math.round(resultado.globalIndex)}/100*\nStatus: *${resultado.status}*\nTerra: ${resultado.vectors.seismic} · Oceanos: ${resultado.vectors.oceanic} · Espaço: ${resultado.vectors.space} · Biologia: ${resultado.vectors.biology} · IA: ${resultado.vectors.ai}`);
  if (enviado) ultimoAlertaTelegram = assinatura;
}

// Nova API pública do DONKI (CCMC/NASA), em vigor desde 30/09/2026.
// Substitui https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/
const DONKI_BASE = "https://ccmc.gsfc.nasa.gov/DONKI-API/get";


const mimeTypes = {

  ".html": "text/html; charset=utf-8",

  ".js": "text/javascript; charset=utf-8",

  ".css": "text/css; charset=utf-8",

  ".json": "application/json; charset=utf-8",

  ".png": "image/png",

  ".jpg": "image/jpeg",

  ".svg": "image/svg+xml"

};


// =========================================================
// PROXY NASA (a chave nunca vai para o navegador)
// =========================================================

function sendJSON(response, status, body) {

  response.writeHead(
    status,
    { "Content-Type": "application/json; charset=utf-8" }
  );

  response.end(
    typeof body === "string"
      ? body
      : JSON.stringify(body)
  );

}


async function fetchJSON(url) {

  const result = await fetch(
    url,
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000)
    }
  );

  if (!result.ok) {
    const detalhe = await result.text().catch(() => "");
    throw new Error(`NASA HTTP ${result.status}${detalhe ? `: ${detalhe.slice(0, 180)}` : ""}`);
  }

  const text = (await result.text()).trim();

  // O DONKI pode devolver corpo vazio quando não há eventos
  if (text === "") {
    return "[]";
  }

  try {
    JSON.parse(text);
  } catch {
    throw new Error("a resposta não é JSON");
  }

  return text;

}


async function proxyNasa(request, response) {

  const incoming = new URL(request.url, "http://localhost");

  const upstreamPath =
    incoming.pathname.replace("/api/nasa/", "");

  const params = new URLSearchParams();

  incoming.searchParams.forEach((value, key) => {

    if (key !== "api_key") {
      params.set(key, value);
    }

  });

  const comChave = new URLSearchParams(params);

  comChave.set("api_key", NASA_KEY);

  const donki = upstreamPath.match(/^DONKI\/([A-Za-z]+)$/);

  const neo =
    /^neo\/[\w./-]+$/.test(upstreamPath) &&
    !upstreamPath.includes("..");

  const candidatos = [];

  if (donki) {

    // 1) API nova do CCMC (sem chave)
    candidatos.push(
      `${DONKI_BASE}/${donki[1]}?${params}`
    );

    // 2) Fallback: gateway api.nasa.gov
    candidatos.push(
      `https://api.nasa.gov/DONKI/${donki[1]}?${comChave}`
    );

  } else if (neo) {

    candidatos.push(
      `https://api.nasa.gov/${upstreamPath}?${comChave}`
    );

  } else {

    response.writeHead(403);
    response.end("Forbidden");
    return;

  }

  let ultimoErro = null;

  for (const url of candidatos) {

    try {

      const body = await fetchJSON(url);

      sendJSON(response, 200, body);

      return;

    } catch (error) {

      ultimoErro = error;

      // Registra só o host: a URL pode conter a chave
      console.error(
        `[proxy NASA] ${new URL(url).host}: ${error.message}`
      );

    }

  }

  sendJSON(
    response,
    502,
    {
      error:
        `NASA indisponível (${ultimoErro?.message || "erro desconhecido"})`
    }
  );

}

async function proxyGoogleNews(request, response) {
  const incoming = new URL(request.url, "http://localhost");
  const query = incoming.searchParams.get("q") || "anomalia planeta ciência ambiente saúde";
  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

  try {
    const result = await fetch(feedUrl, { headers: { Accept: "application/rss+xml, application/xml" }, signal: AbortSignal.timeout(15000) });
    if (!result.ok) throw new Error(`Google News HTTP ${result.status}`);
    const xml = await result.text();
    const decode = value => value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
    const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 12).map(match => {
      const item = match[1];
      const field = name => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`))?.[1] || "");
      return { title: field("title"), url: field("link"), sourceName: field("source") || "Google News", date: field("pubDate"), description: field("description") };
    }).filter(article => article.title && article.url);
    sendJSON(response, 200, { articles });
  } catch (error) {
    sendJSON(response, 502, { error: `Google News indisponível: ${error.message}` });
  }
}

async function checkNews(request, response) {
  const incoming = new URL(request.url, "http://localhost");
  const query = (incoming.searchParams.get("q") || "").trim();

  if (!query) {
    sendJSON(response, 400, { error: "Informe um termo ou afirmação para analisar." });
    return;
  }

  const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
  try {
    const result = await fetch(feedUrl, {
      headers: { Accept: "application/rss+xml, application/xml" },
      signal: AbortSignal.timeout(15000)
    });
    if (!result.ok) throw new Error(`Google News HTTP ${result.status}`);
    const xml = await result.text();
    const decode = value => String(value || "")
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();
    const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(match => {
      const item = match[1];
      const field = name => decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`))?.[1]);
      return {
        title: field("title"),
        sourceName: field("source") || "Google News",
        date: field("pubDate"),
        url: field("link"),
        description: field("description")
      };
    }).filter(article => article.title && article.url).slice(0, 5);

    sendJSON(response, 200, {
      status: articles.length ? "CONFIRMADO NA IMPRENSA" : "NÃO ENCONTRADO",
      found: articles.length > 0,
      query,
      articles
    });
  } catch (error) {
    sendJSON(response, 502, { error: `Google News indisponível: ${error.message}` });
  }
}

async function proxyEarthMonitoring(response) {
  try {
    const [payloadResult, landslidePayloadResult, landslideEventsPayloadResult] = await Promise.allSettled([
      fetchIndiceJSON("https://eonet.gsfc.nasa.gov/api/v3/events?status=open"),
      fetchIndiceJSON("https://eonet.gsfc.nasa.gov/api/v3/categories/landslides?status=all&days=30"),
      fetchIndiceJSON("https://eonet.gsfc.nasa.gov/api/v3/events?category=landslides&status=all&days=30")
    ]);
    const payload = payloadResult.status === "fulfilled" ? payloadResult.value : {};
    const landslidePayload = landslidePayloadResult.status === "fulfilled" ? landslidePayloadResult.value : {};
    const landslideEventsPayload = landslideEventsPayloadResult.status === "fulfilled" ? landslideEventsPayloadResult.value : {};
    const events = Array.isArray(payload.events) ? payload.events : [];
    const recentLandslides = [...(Array.isArray(landslidePayload.events) ? landslidePayload.events : []), ...(Array.isArray(landslideEventsPayload.events) ? landslideEventsPayload.events : [])].filter((event, index, all) => all.findIndex(item => item.id === event.id) === index);
    const categories = { volcanoes: "volcano", landslides: "landslide", wildfires: "fire" };
    const result = Object.entries(categories).map(([category, key]) => {
      const items = key === "landslide"
        ? recentLandslides
        : events.filter(event => event.categories?.some(item => item.id === category));
      const latest = items.sort((a, b) => new Date(b.geometry?.at(-1)?.date || 0) - new Date(a.geometry?.at(-1)?.date || 0))[0];
      const date = latest?.geometry?.at(-1)?.date || null;
      const score = Math.min(100, items.length ? Math.round(20 + Math.log10(items.length + 1) * 40) : 0);
      const status = score >= 70 ? "ALERTA" : score >= 45 ? "ANOMALIA" : score >= 20 ? "ATENÇÃO" : "NORMAL";
      return { key, count: items.length, score, status, latestTitle: latest?.title || "Nenhum evento catalogado", latestDate: date, source: "NASA EONET", period: key === "landslide" ? "últimos 30 dias" : "eventos abertos" };
    });
    sendJSON(response, 200, { scope: "planetário", updatedAt: new Date().toISOString(), cards: result });
  } catch (error) {
    sendJSON(response, 502, { error: `Monitoramento planetário indisponível: ${error.message}` });
  }
}

async function fetchIndiceJSON(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchIndiceText(url) {
  const response = await fetch(url, { headers: { Accept: "application/xml, text/xml, text/plain" }, signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function calcularIndiceGlobalDinamico() {
  const dados = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "anomalia.json"), "utf8"));
  const [usgsResult, flrResult, cmeResult, gstResult, neoResult, biologyResult, aiResult] = await Promise.allSettled([
    fetchIndiceJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"),
    fetchIndiceJSON(`https://api.nasa.gov/DONKI/FLR?startDate=${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}&endDate=${new Date().toISOString().slice(0, 10)}&api_key=${NASA_KEY}`),
    fetchIndiceJSON(`https://api.nasa.gov/DONKI/CME?startDate=${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}&endDate=${new Date().toISOString().slice(0, 10)}&api_key=${NASA_KEY}`),
    fetchIndiceJSON(`https://api.nasa.gov/DONKI/GST?startDate=${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}&endDate=${new Date().toISOString().slice(0, 10)}&api_key=${NASA_KEY}`),
    fetchIndiceJSON(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${new Date().toISOString().slice(0, 10)}&end_date=${new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)}&api_key=${NASA_KEY}`),
    fetchIndiceJSON("https://www.who.int/api/hubs/diseaseoutbreaknews?$top=10&$orderby=PublicationDateAndTime%20desc"),
    fetchIndiceJSON("https://api.gdeltproject.org/api/v2/doc/doc?query=(AI%20OR%20%22artificial%20intelligence%22)%20(incident%20OR%20safety%20OR%20failure)&mode=artlist&maxrecords=10&format=json&sort=datedesc")
  ]);
  const earth = usgsResult.status === "fulfilled" ? (usgsResult.value.features || []).map(item => ({ magnitude: item.properties?.mag, status: "normal" })) : (dados.earth?.events || []);
  const signals = Array.isArray(dados.signals) ? dados.signals : [];
  const ocean = dados.ocean || {};
  const flares = flrResult.status === "fulfilled" ? flrResult.value : [];
  const cmes = cmeResult.status === "fulfilled" ? cmeResult.value : [];
  const gsts = gstResult.status === "fulfilled" ? gstResult.value : [];
  const neos = neoResult.status === "fulfilled" ? Object.values(neoResult.value.near_earth_objects || {}).flat() : (dados.space?.neos || []);
  const biology = biologyResult.status === "fulfilled" ? (biologyResult.value.value || biologyResult.value.results || biologyResult.value || []) : (dados.biology?.events || []);
  const ai = aiResult.status === "fulfilled" ? (aiResult.value.articles || []) : (dados.ai?.incidents || []);
  const severity = status => ({ normal: 0, desconhecido: 0, atencao: .35, anomalia: .7, alerta: 1 }[String(status || "").toLowerCase()] || 0);
  const earthSignals = [...earth, ...signals.filter(item => /sismo|vulcan|terremoto|geotect/i.test(`${item.title || ""} ${item.type || ""}`))];
  const seismic = Math.min(20, earthSignals.filter(item => Number(item.magnitude) >= 5).length * 4 + earthSignals.reduce((sum, item) => sum + severity(item.status) * 2, 0));
  const enso = Math.abs(Number(ocean.enso?.roni || 0));
  const oceanic = Math.min(20, Math.round(enso * 10) + (ocean.grid || []).reduce((sum, item) => sum + Math.min(5, Math.abs(Number(item.anomaly || item.value || 0)) * 2), 0) + (ocean.cards || []).reduce((sum, item) => sum + severity(item.status) * 6, 0));
  const solarScore = flares.reduce((sum, item) => sum + (/^X/i.test(item.classType || "") ? 8 : /^M/i.test(item.classType || "") ? 4 : 1), 0);
  const cmeScore = cmes.reduce((sum, item) => sum + (Number(item.cmeAnalyses?.at(-1)?.speed || 0) >= 2000 ? 8 : Number(item.cmeAnalyses?.at(-1)?.speed || 0) >= 1000 ? 5 : 2), 0);
  const gstScore = gsts.reduce((sum, item) => sum + (Number(item.allKpIndex?.at(-1)?.kpIndex || 0) >= 7 ? 8 : Number(item.allKpIndex?.at(-1)?.kpIndex || 0) >= 5 ? 5 : 1), 0);
  const neoScore = neos.reduce((sum, item) => sum + (item.is_potentially_hazardous_asteroid || item.potentiallyHazardous ? 8 : 0), 0);
  const spaceScore = Math.min(25, solarScore + cmeScore + gstScore + neoScore);
  const biologyScore = Math.min(20, biology.reduce((sum, item) => sum + (severity(item.status) || 0.35) * 3, 0) + (dados.biology?.cards || []).reduce((sum, item) => sum + severity(item.status) * 3, 0));
  const aiScore = Math.min(15, ai.reduce((sum, item) => sum + (severity(item.status) || 0.35) * 3, 0) + (dados.ai?.cards || []).reduce((sum, item) => sum + severity(item.status) * 3, 0));
  const vectors = { seismic, oceanic, space: spaceScore, biology: biologyScore, ai: aiScore };
  const globalIndex = Math.max(0, Math.min(100, Object.values(vectors).reduce((sum, value) => sum + value, 0)));
  const status = globalIndex >= 60 ? "ALERTA" : globalIndex >= 30 ? "ATENÇÃO" : "NORMAL";
  const resultado = { globalIndex, status, vectors, updatedAt: new Date().toISOString() };
  return resultado;
}

const alertasTelegramEnviados = new Map();
const alertasTelegramPendentes = new Map();
const JANELA_DEDUPLICACAO = 24 * 60 * 60 * 1000;
const JANELA_AGRUPAMENTO = 5 * 60 * 1000;

function enfileirarAlertaTelegram(aviso) {
  const agora = Date.now();
  for (const [id, timestamp] of alertasTelegramEnviados) {
    if (agora - timestamp > JANELA_DEDUPLICACAO) alertasTelegramEnviados.delete(id);
  }
  if (alertasTelegramEnviados.has(aviso.id)) return;
  let grupo = alertasTelegramPendentes.get(aviso.sector);
  if (!grupo) {
    grupo = { avisos: [], timer: setTimeout(() => enviarGrupoTelegram(aviso.sector), JANELA_AGRUPAMENTO) };
    alertasTelegramPendentes.set(aviso.sector, grupo);
  }
  if (!grupo.avisos.some(item => item.id === aviso.id)) grupo.avisos.push(aviso);
}

async function enviarGrupoTelegram(sector) {
  const grupo = alertasTelegramPendentes.get(sector);
  if (!grupo) return;
  alertasTelegramPendentes.delete(sector);
  const novos = grupo.avisos.filter(aviso => !alertasTelegramEnviados.has(aviso.id));
  if (!novos.length) return;
  const primeira = novos[0];
  const mensagem = novos.length === 1
    ? primeira.message
    : `🚨 *ALERTA CRÍTICO · ${sector}*\n\n${novos.length} novos eventos críticos detectados no setor.\n\n${novos.map((aviso, index) => `${index + 1}. ${aviso.summary}`).join("\n")}`;
  if (await enviarAlertaTelegram(mensagem)) novos.forEach(aviso => alertasTelegramEnviados.set(aviso.id, Date.now()));
}

async function monitorarAlertasSetoriais() {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  const hoje = new Date().toISOString().slice(0, 10);
  const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const resultados = await Promise.allSettled([
    fetchIndiceJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"),
    fetchIndiceJSON(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${hoje}&end_date=${new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)}&api_key=${NASA_KEY}`),
    fetchIndiceJSON("https://www.who.int/api/hubs/diseaseoutbreaknews?$top=5&$orderby=PublicationDateAndTime%20desc"),
    fetchIndiceJSON("https://api.gdeltproject.org/api/v2/doc/doc?query=(AI%20OR%20%22artificial%20intelligence%22)%20(incident%20OR%20failure%20OR%20outage%20OR%20security)&mode=artlist&maxrecords=5&format=json&sort=datedesc"),
    fetchIndiceText("https://www.tsunami.gov/events/xml/PHEB/")
  ]);
  const [usgsResult, neoResult, whoResult, gdeltResult, oceanResult] = resultados;
  const avisos = [];
  const earthquakes = usgsResult.status === "fulfilled" ? (usgsResult.value.features || []) : [];
  earthquakes.filter(item => Number(item.properties?.mag) >= 6.5).forEach(item => {
    const p = item.properties || {};
    avisos.push({ sector: "TERRA / USGS", id: `usgs:${item.id}`, summary: `M ${p.mag} · ${p.place || "local não informado"}`, message: `🚨 *ALERTA SÍSMICO (USGS)*\n\nTerremoto de magnitude *M ${p.mag}* detectado próximo a ${p.place || "localização não informada"}.\n\n🗺️ *Detalhes:* ${p.url || "https://earthquake.usgs.gov/"}` });
  });
  const neoObjects = neoResult.status === "fulfilled" ? Object.values(neoResult.value.near_earth_objects || {}).flat() : [];
  neoObjects.filter(item => item.is_potentially_hazardous_asteroid && Number(item.close_approach_data?.[0]?.miss_distance?.astronomical || Infinity) <= 0.05).forEach(item => {
    const approach = item.close_approach_data?.[0];
    avisos.push({ sector: "ESPAÇO / NASA", id: `neo:${item.id}:${approach?.close_approach_date || hoje}`, summary: `${item.name || item.id} · aproximação crítica`, message: `🚨 *ALERTA CNEOS / NASA*\n\nO asteroide potencialmente perigoso *${item.name || item.id}* foi detectado com aproximação crítica.\n\n📡 *Detalhes:* https://cneos.jpl.nasa.gov/` });
  });
  const whoItems = whoResult.status === "fulfilled" ? (Array.isArray(whoResult.value) ? whoResult.value : whoResult.value.value || whoResult.value.results || []) : [];
  whoItems.filter(item => /outbreak|emergency|ebola|cholera|mpox|pandemic|surto|emergência/i.test(JSON.stringify(item))).slice(0, 5).forEach(item => {
    const title = item.Title || item.title || item.Name || item.name || "Novo boletim de biossegurança";
    const link = item.Link || item.link || "https://www.who.int/emergencies/disease-outbreak-news";
    avisos.push({ sector: "BIOLOGIA / OMS", id: `who:${title}:${item.PublicationDateAndTime || item.date || ontem}`, summary: title, message: `🚨 *AVISO BIOSSEGURANÇA (OMS)*\n\n${title}.\n\n🩺 *Detalhes:* ${link}` });
  });
  const aiItems = gdeltResult.status === "fulfilled" ? (gdeltResult.value.articles || []) : [];
  aiItems.filter(item => /outage|attack|breach|critical failure|emergency/i.test(`${item.title || ""}`)).slice(0, 2).forEach(item => {
    avisos.push({ sector: "IA / GDELT", id: `gdelt:${item.url || item.title}`, summary: item.title || "incidente crítico", message: `🚨 *ALERTA REDE IA (GDELT)*\n\nAnomalia crítica relacionada a inteligência artificial: *${item.title || "evento sem título"}*.\n\n💻 *Detalhes:* ${item.url || "https://www.gdeltproject.org/"}` });
  });
  if (oceanResult.status === "fulfilled") {
    const xml = oceanResult.value;
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(match => {
      const value = name => match[1].match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim() || "";
      return { title: value("title"), description: value("description"), link: value("link") };
    }).filter(item => item.title && !/no tsunami|no threat|all clear|sem ameaça/i.test(`${item.title} ${item.description}`));
    items.filter(item => /warning|watch|advisory|alert|tsunami|ameaça|aviso/i.test(`${item.title} ${item.description}`)).slice(0, 2).forEach(item => {
      avisos.push({ sector: "OCEANOS / NOAA", id: `ocean:${item.title}:${hoje}`, summary: item.title, message: `🚨 *ALERTA OCEANOS (NOAA / PTWC)*\n\n${item.title}.\n\n🌊 *Detalhes:* ${item.link || "https://www.tsunami.gov/"}` });
    });
  }
  avisos.filter(aviso => aviso.sector && aviso.id && aviso.message).forEach(enfileirarAlertaTelegram);
}


// =========================================================
// SERVIDOR
// =========================================================

const server = http.createServer(
  (request, response) => corsMiddleware(request, response, () => {

    let requestPath;

    try {

      requestPath =
        decodeURIComponent(
          request.url.split("?")[0]
        );

    } catch {

      response.writeHead(400);
      response.end("Bad request");
      return;

    }

    if (requestPath === "/") {
      requestPath = "/index.html";
    }


    if (requestPath.startsWith("/api/nasa/")) {

      proxyNasa(request, response);

      return;

    }

    if (requestPath === "/api/news/google") {
      proxyGoogleNews(request, response);
      return;
    }

    if (requestPath === "/api/check-news") {
      checkNews(request, response);
      return;
    }

    if (requestPath === "/api/earth-monitoring") {
      proxyEarthMonitoring(response);
      return;
    }

    if (requestPath === "/api/global-index") {
      calcularIndiceGlobalDinamico().then(result => sendJSON(response, 200, result)).catch(error => sendJSON(response, 500, { error: `Índice global indisponível: ${error.message}` }));
      return;
    }


    const filePath =
      path.join(
        __dirname,
        requestPath
      );


    // Bloqueia saída da pasta, arquivos ocultos (.env, .git),
    // node_modules, scripts e arquivos internos do servidor
    const relative =
      path.relative(__dirname, filePath);

    const blocked =
      relative.startsWith("..") ||
      path.isAbsolute(relative) ||
      relative
        .split(path.sep)
        .some(
          part =>
            part.startsWith(".") ||
            part === "node_modules" ||
            part === "scripts"
        ) ||
      [
        "server.js",
        "env.js",
        "package.json",
        "package-lock.json"
      ].includes(relative);

    if (blocked) {

      response.writeHead(403);

      response.end("Forbidden");

      return;

    }


    fs.readFile(
      filePath,
      (error, data) => {

        if (error) {

          response.writeHead(404);

          response.end("Arquivo não encontrado.");

          return;

        }


        const extension =
          path.extname(filePath)
            .toLowerCase();


        response.writeHead(
          200,
          {
            "Content-Type":
              mimeTypes[extension] ||
              "application/octet-stream"
          }
        );


        response.end(data);

      }
    );

  })
);


server.listen(
  PORT,
  () => {

    console.log(
      `ANOMALIA disponível em http://localhost:${PORT}`
    );

  }
);

// Mantém o snapshot de dados atualizado sem intervenção manual.
atualizarDadosAutomaticamente();
setInterval(atualizarDadosAutomaticamente, 5 * 60 * 1000);
monitorarAlertasSetoriais().catch(error => console.error("Falha no monitoramento setorial:", error.message));
setInterval(() => monitorarAlertasSetoriais().catch(error => console.error("Falha no monitoramento setorial:", error.message)), 5 * 60 * 1000);
