import "./env.js";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const PORT = 3000;

const NASA_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

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
    throw new Error(`HTTP ${result.status}`);
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


// =========================================================
// SERVIDOR
// =========================================================

const server = http.createServer(
  (request, response) => {

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

  }
);


server.listen(
  PORT,
  () => {

    console.log(
      `ANOMALIA disponível em http://localhost:${PORT}`
    );

  }
);