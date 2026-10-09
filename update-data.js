import "./env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url))
);

const OUTPUT =
  path.join(
    ROOT,
    "data",
    "anomalia.json"
  );


const NASA_KEY =
  process.env.NASA_API_KEY ||
  "DEMO_KEY";


async function getJSON(url) {

  const response =
    await fetch(url, {
      headers: {
        "User-Agent":
          "ANOMALIA/2.0 public-data-observer"
      }
    });


  if (!response.ok) {

    throw new Error(
      `${response.status} ${response.statusText} — ${url}`
    );

  }


  return response.json();

}

async function getText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "ANOMALIA/2.0 public-data-observer" } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  return response.text();
}

async function getEnsoData() {
  const source = "https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt";
  try {
    const text = await getText(source);
    const rows = text.split(/\r?\n/).map(line => {
      const match = line.match(/^\s*(DJF|JFM|FMA|MAM|AMJ|MJJ|JJA|JAS|ASO|SON|OND|NDJ)\s+(\d{4})\s+[-\d.]+\s+([-\d.]+)/);
      return match ? { season: match[1], year: Number(match[2]), value: Number(match[3]) } : null;
    }).filter(item => item && Number.isFinite(item.value));
    const latest = rows.at(-1);
    if (!latest) throw new Error("Nenhum índice Niño 3.4 válido");
    const phase = latest.value >= 0.5 ? "El Niño" : latest.value <= -0.5 ? "La Niña" : "Neutro";
    const probabilityText = await getText("https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/probabilities/");
    const probabilityRows = [...probabilityText.matchAll(/<tr>\s*<th[^>]*>\s*<abbr[^>]*>([A-Z]{3})[\s\S]*?<\/th>\s*<td>(\d+)<\/td>\s*<td>(\d+)<\/td>\s*<td>(\d+)<\/td>\s*<\/tr>/gi)];
    const probabilities = probabilityRows.length ? { season: probabilityRows[0][1], lanina: Number(probabilityRows[0][2]), neutral: Number(probabilityRows[0][3]), elnino: Number(probabilityRows[0][4]) } : null;
    return { roni: Number(latest.value.toFixed(2)), phase, source, observedAt: `${latest.year}-${latest.season}`, status: "normal", live: true, probabilities };
  } catch (error) {
    console.warn("ENSO NOAA indisponível:", error.message);
    return { roni: null, phase: null, source, observedAt: null, status: "desconhecido", live: false };
  }
}


function percentile(values, value) {

  if (!values.length) return null;

  const sorted =
    [...values].sort(
      (a, b) => a - b
    );

  let count = 0;

  for (const item of sorted) {

    if (item <= value) {
      count++;
    }

  }

  return (
    count /
    sorted.length
  ) * 100;

}


function classifyPercentile(p) {

  if (p === null) {
    return "desconhecido";
  }

  if (p >= 99) {
    return "alerta";
  }

  if (p >= 95) {
    return "anomalia";
  }

  if (p >= 85) {
    return "atencao";
  }

  return "normal";

}


async function getEarthquakes() {

  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


  const data =
    await getJSON(url);


  const events =
    data.features.map(
      feature => {

        const coords =
          feature.geometry.coordinates;

        const magnitude =
          feature.properties.mag || 0;


        return {

          id: feature.id,

          lat: coords[1],

          lon: coords[0],

          depth: coords[2],

          magnitude,

          place:
            feature.properties.place ||
            "Localização não informada",

          time:
            feature.properties.time,

          status:
            magnitude >= 7
              ? "alerta"
              : magnitude >= 6
                ? "anomalia"
                : magnitude >= 5
                  ? "atencao"
                  : "normal"

        };

      }
    );


  const magnitudes =
    events.map(
      item => item.magnitude
    );


  return {

    cards: [

      {
        title: "🌍 TERRA",
        subtitle: "Eventos nas últimas 24h",
        value: events.length,
        detail: "Fonte: USGS",
        status: "normal"
      },

      {
        title: "MAGNITUDE",
        subtitle: "Maior evento",
        value:
          Math.max(
            0,
            ...magnitudes
          ).toFixed(1),
        detail: "Maior magnitude observada",
        status:
          Math.max(
            0,
            ...magnitudes
          ) >= 7
            ? "alerta"
            : "normal"
      },

      {
        title: "REFERÊNCIA",
        subtitle: "Classificação",
        value: "ESTATÍSTICA",
        detail: "Não é previsão sísmica",
        status: "normal"
      },

      {
        title: "FONTE",
        subtitle: "USGS",
        value: "LIVE",
        detail: "Feed GeoJSON público",
        status: "normal"
      }

    ],

    events

  };

}


async function getOceanData() {

  const enso = await getEnsoData();

  const points = [];

  const latitudes =
    [-60, -40, -20, 0, 20, 40, 60];

  const longitudes =
    [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150];


  const now =
    new Date();


  let loaded = false;

  let responseData = null;

  let usedDate = null;


  for (
    let daysBack = 1;
    daysBack <= 7;
    daysBack++
  ) {

    const candidate =
      new Date(now);

    candidate.setUTCDate(
      candidate.getUTCDate() -
      daysBack
    );


    const date =
      candidate
        .toISOString()
        .slice(0, 10);


    const query =
      `https://coastwatch.pfeg.noaa.gov/erddap/griddap/ncdcOisst21NrtAgg_LonPM180.json?anom[(${date}T12:00:00Z)][(0)][(-60):20:(60)][(0):30:(180)]`;


    try {

      responseData =
        await getJSON(query);

      usedDate = date;

      loaded = true;

      break;

    } catch {

      // tenta o dia anterior

    }

  }


  if (!loaded) {

    return {

      cards: [

        {
          title: "🌊 OCEANOS",
          subtitle: "SST",
          value: "—",
          detail: "Fonte temporariamente indisponível",
          status: "desconhecido"
        }

      ],

      grid: [],

      enso

    };

  }


  const table =
    responseData.table;


  const columns =
    table.columnNames;


  const rows =
    table.rows;


  const latIndex =
    columns.indexOf("latitude");


  const lonIndex =
    columns.indexOf("longitude");


  const anomalyIndex =
    columns.indexOf("anom");


  rows.forEach(
    row => {

      const anomaly =
        Number(
          row[anomalyIndex]
        );


      if (
        Number.isNaN(anomaly)
      ) {
        return;
      }


      points.push({

        lat:
          Number(row[latIndex]),

        lon:
          Number(row[lonIndex]),

        anomaly,

        region:
          oceanRegion(
            Number(row[latIndex]),
            Number(row[lonIndex])
          )

      });

    }
  );


  const anomalies =
    points.map(
      p => Math.abs(p.anomaly)
    );

  const regionStats = {};
  points.forEach(point => {
    const key = point.region || "Oceano global";
    if (!regionStats[key]) regionStats[key] = { sum: 0, count: 0, maximum: -Infinity };
    regionStats[key].sum += point.anomaly;
    regionStats[key].count += 1;
    regionStats[key].maximum = Math.max(regionStats[key].maximum, point.anomaly);
  });
  Object.values(regionStats).forEach(stat => {
    stat.mean = stat.count ? Number((stat.sum / stat.count).toFixed(2)) : null;
    stat.maximum = Number.isFinite(stat.maximum) ? Number(stat.maximum.toFixed(2)) : null;
  });


  const average =
    anomalies.length
      ? anomalies.reduce(
          (a, b) => a + b,
          0
        ) / anomalies.length
      : null;


  const maximum =
    anomalies.length
      ? Math.max(...anomalies)
      : null;

  const signedAverage = points.length
    ? Number((points.reduce((sum, point) => sum + point.anomaly, 0) / points.length).toFixed(2))
    : null;
  const hotAreaPercent = points.length
    ? Number(((points.filter(point => point.anomaly >= 1).length / points.length) * 100).toFixed(1))
    : null;


  let oceanStatus =
    "normal";


  if (maximum >= 1.5) {
    oceanStatus = "alerta";
  } else if (maximum >= 1) {
    oceanStatus = "anomalia";
  } else if (maximum >= .5) {
    oceanStatus = "atencao";
  }


  return {

    cards: [

      {
        title: "🌊 OCEANOS",
        subtitle: "Desvio médio absoluto",
        value:
          average === null
            ? "—"
            : `${average.toFixed(2)} °C`,
        detail:
          `Campo NOAA OISST — ${usedDate}`,
        status:
          oceanStatus
      },

      {
        title: "EXTREMO",
        subtitle: "Maior desvio observado",
        value:
          maximum === null
            ? "—"
            : `${maximum.toFixed(2)} °C`,
        detail:
          "Valor absoluto da anomalia",
        status:
          oceanStatus
      },

      {
        title: "ÁREA QUENTE",
        subtitle: "Pontos com +1 °C",
        value: hotAreaPercent === null ? "—" : `${hotAreaPercent}%`,
        detail: "Estimativa na grade consultada",
        status: hotAreaPercent >= 20 ? "anomalia" : "normal"
      },

      {
        title: "REFERÊNCIA",
        subtitle: "OISST",
        value: "1981+",
        detail:
          "Série histórica do produto",
        status: "normal"
      },

      {
        title: "MAPA",
        subtitle: "Grade global",
        value: points.length,
        detail:
          "Pontos processados",
        status: "normal"
      }

    ],

    grid: points,
    sst: {
      usedDate,
      signedAverage,
      absoluteAverage: average,
      maximum,
      hotAreaPercent,
      regions: regionStats,
      reference: "NOAA OISST · climatologia do produto"
    },

    enso

  };

}


function oceanRegion(lat, lon) {

  if (lat >= 5 && lat <= 25 && lon >= -180 && lon <= -80) {
    return "Pacífico Norte";
  }

  if (lat >= -5 && lat <= 5 && lon >= -170 && lon <= -120) {
    return "Pacífico Equatorial";
  }

  if (lat < -5 && lat > -45 && lon < -20 && lon > -80) {
    return "Atlântico Sul";
  }

  if (lat > 0 && lat < 45 && lon > -80 && lon < 20) {
    return "Atlântico Norte";
  }

  if (lon > 20 && lon < 150 && lat > -40 && lat < 30) {
    return "Índico";
  }

  return "Oceano global";

}


async function getSpaceData() {

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);


  const start =
    today;


  const neoURL =
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${start}&api_key=${NASA_KEY}`;


  const neo =
    await getJSON(neoURL);


  const objects =
    neo.near_earth_objects?.[today] || [];


  const neos =
    objects.map(
      item => {

        const approach =
          item.close_approach_data?.[0];


        return {

          name:
            item.name,

          date:
            approach?.close_approach_date_full ||
            today,

          distance:
            approach
              ? `${Number(
                  approach.miss_distance.kilometers
                ).toLocaleString("pt-BR")} km`
              : "—",

          absoluteMagnitude:
            item.absolute_magnitude_h,

          potentiallyHazardous:
            item.is_potentially_hazardous_asteroid,

          status:
            item.is_potentially_hazardous_asteroid
              ? "alerta"
              : "normal"

        };

      }
    );


  const hazardous =
    neos.filter(
      item =>
        item.potentiallyHazardous
    ).length;


  return {

    cards: [

      {
        title: "☄️ ESPAÇO",
        subtitle: "Objetos próximos",
        value: neos.length,
        detail:
          "NASA NeoWs",
        status: "normal"
      },

      {
        title: "RISCO",
        subtitle: "Potencialmente perigosos",
        value: hazardous,
        detail:
          "Classificação NASA",
        status:
          hazardous
            ? "alerta"
            : "normal"
      },

      {
        title: "FONTE",
        subtitle: "NASA",
        value: "LIVE",
        detail:
          "Near Earth Object Web Service",
        status: "normal"
      }

    ],

    neos

  };

}


async function getBiologyData() {

  const url =
    "https://www.who.int/api/hubs/diseaseoutbreaknews?$top=10&$orderby=PublicationDateAndTime%20desc";


  const response =
    await getJSON(url);


  const items =
    response.value || [];


  const events =
    items.map(
      item => {

        const country =
          extractCountry(
            item.Title || ""
          );


        const coords =
          countryCoordinates[country];


        return {

          title:
            item.Title ||
            "Evento epidemiológico",

          summary:
            stripHTML(
              item.Overview ||
              item.Summary ||
              item.Assessment ||
              ""
            ).slice(0, 320),

          date:
            item.PublicationDateAndTime,

          sourceName:
            "Organização Mundial da Saúde",

          url:
            item.ItemDefaultUrl
              ? `https://www.who.int${item.ItemDefaultUrl}`
              : "https://www.who.int/emergencies/disease-outbreak-news",

          lat:
            coords?.[0] ?? null,

          lon:
            coords?.[1] ?? null,

          status:
            "atencao"

        };

      }
    );


  return {

    cards: [

      {
        title: "🦠 BIOLOGIA",
        subtitle: "Eventos recentes",
        value: events.length,
        detail:
          "Disease Outbreak News — OMS",
        status:
          events.length
            ? "atencao"
            : "normal"
      },

      {
        title: "MÉTODO",
        subtitle: "Evento ≠ surto",
        value: "SIM",
        detail:
          "Classificação conservadora",
        status: "normal"
      },

      {
        title: "FONTE",
        subtitle: "OMS",
        value: "LIVE",
        detail:
          "API pública",
        status: "normal"
      }

    ],

    events

  };

}


function stripHTML(text) {

  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}


function extractCountry(title) {

  const countries =
    Object.keys(
      countryCoordinates
    );

  const lower =
    title.toLowerCase();


  return countries.find(
    country =>
      lower.includes(
        country.toLowerCase()
      )
  );

}


const countryCoordinates = {

  "Brazil": [-10.8, -51.9],
  "Brazil -": [-10.8, -51.9],

  "China": [35.8, 104.1],

  "India": [22.9, 79.0],

  "Egypt": [26.8, 30.8],

  "France": [46.2, 2.2],

  "Italy": [42.8, 12.8],

  "United States": [39.8, -98.5],

  "United Kingdom": [55.3, -3.4],

  "Saudi Arabia": [23.8, 45.0],

  "Indonesia": [-2.5, 118.0],

  "Pakistan": [30.3, 69.3],

  "Nigeria": [9.1, 8.6],

  "Democratic Republic of the Congo": [-2.8, 23.6],

  "Congo": [-1.5, 15.3],

  "South Africa": [-30.5, 22.9],

  "Brazil": [-10.8, -51.9]

};


async function getAIData() {

  /*
    A API do AIID pode sofrer restrições de origem.

    Por isso não deixamos o site depender dela.

    O bloco abaixo aceita um arquivo local
    futuramente produzido pelo updater.
  */

  return {

    cards: [

      {
        title: "🤖 IA",
        subtitle: "Incidentes documentados",
        value: "—",
        detail:
          "AI Incident Database",
        status: "desconhecido"
      },

      {
        title: "PRINCÍPIO",
        subtitle: "Não é previsão",
        value: "SIM",
        detail:
          "Eventos documentados",
        status: "normal"
      }

    ],

    incidents: []

  };

}


async function getNewsData() {

  const query =
    encodeURIComponent(
      "(earthquake OR tsunami OR volcano OR ocean OR climate OR epidemic OR outbreak OR AI incident)"
    );


  const url =
    `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=artlist&maxrecords=8&format=json&sort=datedesc`;


  try {

    const data =
      await getJSON(url);


    return (
      data.articles || []
    ).map(
      item => ({

        source:
          item.domain ||
          "GDELT",

        title:
          item.title,

        description:
          "Sinal de mídia identificado no clipping. A notícia não constitui, sozinha, evidência de uma anomalia.",

        url:
          item.url,

        status:
          "atencao"

      })
    );

  } catch {

    return [];

  }

}


async function main() {

  console.log(
    "Atualizando ANOMALIA..."
  );


  const [
    earth,
    ocean,
    space,
    biology,
    ai,
    news
  ] =
    await Promise.allSettled([

      getEarthquakes(),

      getOceanData(),

      getSpaceData(),

      getBiologyData(),

      getAIData(),

      getNewsData()

    ]);


  const getResult =
    result =>
      result.status === "fulfilled"
        ? result.value
        : null;


  const earthData =
    getResult(earth) ||
    {
      cards: [],
      events: []
    };


  const oceanData =
    getResult(ocean) ||
    {
      cards: [],
      grid: [],
      enso: {
        roni: 0,
        status: "desconhecido",
        source:
          "https://psl.noaa.gov/enso/"
      }
    };


  const spaceData =
    getResult(space) ||
    {
      cards: [],
      neos: []
    };


  const biologyData =
    getResult(biology) ||
    {
      cards: [],
      events: []
    };


  const aiData =
    getResult(ai) ||
    {
      cards: [],
      incidents: []
    };


  const newsData =
    getResult(news) ||
    [];


  const data = {

    meta: {

      updatedAt:
        new Date().toISOString(),

      version:
        "2.0",

      methodology:
        "comparison-based"

    },


    overview: {

      earth:
        earthData.cards[0] || {},

      ocean:
        oceanData.cards[0] || {},

      space:
        spaceData.cards[0] || {},

      biology:
        biologyData.cards[0] || {}

    },


    signals: [

      ...earthData.events
        .slice(0, 4)
        .map(item => ({

          title:
            `Sismo — ${item.place}`,

          description:
            `Magnitude ${item.magnitude.toFixed(1)}`,

          status:
            item.status,

          lat:
            item.lat,

          lon:
            item.lon

        })),

      ...biologyData.events
        .slice(0, 4)
        .map(item => ({

          title:
            item.title,

          description:
            item.summary,

          status:
            item.status,

          lat:
            item.lat,

          lon:
            item.lon

        }))

    ],


    earth:
      earthData,


    ocean:
      oceanData,


    space:
      spaceData,


    biology:
      biologyData,


    ai:
      aiData,


    news:
      newsData

  };


  await fs.mkdir(
    path.dirname(OUTPUT),
    { recursive: true }
  );


  await fs.writeFile(
    OUTPUT,
    JSON.stringify(
      data,
      null,
      2
    ),
    "utf8"
  );


  console.log(
    "ANOMALIA atualizado."
  );

}


main()
  .catch(
    error => {

      console.error(
        error
      );

      process.exit(1);

    }
  );
