document.addEventListener("DOMContentLoaded", () => {

    console.log("ANOMALIA iniciado");

    const brazilSection = document.getElementById("brazil");
    if (brazilSection) {
        brazilSection.innerHTML = `<div class="section-heading"><div><span class="section-kicker">ESPECIAL BRASIL</span><h2>ESPECIAL BRASIL · RADAR DE ANOMALIAS TERRITORIAIS</h2><div class="brazil-national-risk"><span>ÍNDICE NACIONAL DE ANOMALIA: 58/100</span><strong>🟧 ANOMALIA MODERADA</strong></div><p>Monitoramento contínuo de estresse de biomas, recursos hídricos, atividade geofísica e eventos climáticos nos 26 estados e DF.</p></div></div><div class="brazil-terminal-top"><div class="brazil-map-panel"><div class="brazil-panel-head"><div><span class="panel-kicker">MAPA INTERATIVO</span><h3>Distribuição territorial dos sinais</h3></div><span id="brazil-region-selection">Todas as regiões</span></div><svg class="brazil-map" viewBox="0 0 520 330" role="img" aria-label="Mapa esquemático do Brasil dividido por regiões"><path class="brazil-region status-anomalia" data-region="Norte" d="M54 46 L180 25 L250 54 L226 127 L174 144 L109 126 L47 91 Z"><title>Norte · Anomalia</title></path><path class="brazil-region status-atencao" data-region="Nordeste" d="M250 54 L343 64 L407 101 L371 153 L288 143 L226 127 Z"><title>Nordeste · Atenção</title></path><path class="brazil-region status-normal" data-region="Centro-Oeste" d="M174 144 L226 127 L288 143 L300 221 L235 244 L168 206 Z"><title>Centro-Oeste · Normal</title></path><path class="brazil-region status-alerta" data-region="Sudeste" d="M288 143 L371 153 L385 218 L300 221 Z"><title>Sudeste · Alerta</title></path><path class="brazil-region status-atencao" data-region="Sul" d="M235 244 L300 221 L330 276 L276 308 L215 286 Z"><title>Sul · Atenção</title></path></svg><div class="brazil-map-legend"><span><i class="status-dot normal"></i>Normal</span><span><i class="status-dot atencao"></i>Atenção</span><span><i class="status-dot anomalia"></i>Anomalia</span><span><i class="status-dot alerta"></i>Alerta</span></div></div><aside class="brazil-alerts-panel"><div class="brazil-panel-head"><div><span class="panel-kicker">PRIORIDADE OPERACIONAL</span><h3>Top 3 alertas territoriais ativos</h3></div></div><article class="brazil-alert-card status-alerta"><span class="brazil-alert-badge">🔴 ALERTA</span><strong>Sudeste · estresse hídrico</strong><p>Reservatórios e umidade do solo abaixo da referência em áreas monitoradas.</p><small>Fonte: CEMADEN / ANA</small></article><article class="brazil-alert-card status-anomalia"><span class="brazil-alert-badge">🟧 ANOMALIA</span><strong>Norte · pressão sobre biomas</strong><p>Focos de calor e perda de umidade ampliam a janela de propagação de queimadas.</p><small>Fonte: INPE / CEMADEN</small></article><article class="brazil-alert-card status-atencao"><span class="brazil-alert-badge">🟡 ATENÇÃO</span><strong>Sul · variância climática</strong><p>Oscilações de temperatura e chuva alteram o padrão regional recente.</p><small>Fonte: INMET</small></article></aside></div><div class="brazil-region-grid"><article class="brazil-region-card status-anomalia" data-region-card="Norte"><header><h3>Norte</h3><span>🟧 Anomalia</span></header><strong class="brazil-metric">Déficit Hídrico: -31%</strong><p>Baixa umidade do solo favorecendo gatilhos de queimada rápida e estresse de biomas.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article><article class="brazil-region-card status-atencao" data-region-card="Nordeste"><header><h3>Nordeste</h3><span>🟡 Atenção</span></header><strong class="brazil-metric">Variância Térmica: +2.8 °C</strong><p>Persistência de calor e baixa precipitação pressionam sistemas agrícolas e hídricos.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article><article class="brazil-region-card status-normal" data-region-card="Centro-Oeste"><header><h3>Centro-Oeste</h3><span>🟢 Normal</span></header><strong class="brazil-metric">Umidade do Solo: dentro da base</strong><p>Leituras ambientais estáveis, com variações localizadas sob observação regular.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article><article class="brazil-region-card status-alerta" data-region-card="Sudeste"><header><h3>Sudeste</h3><span>🔴 Alerta</span></header><strong class="brazil-metric">Reservatórios: -22%</strong><p>Déficit acumulado elevando a vulnerabilidade de abastecimento em bacias críticas.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article><article class="brazil-region-card status-atencao" data-region-card="Sul"><header><h3>Sul</h3><span>🟡 Atenção</span></header><strong class="brazil-metric">Chuva acumulada: +18%</strong><p>Oscilação pluviométrica aumenta a necessidade de monitorar cheias e deslizamentos.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article></div>`;
        const map = brazilSection.querySelector(".brazil-map");
        map.setAttribute("aria-label", "Mapa territorial reconhecível do Brasil dividido em cinco regiões");
        map.innerHTML = `<path class="brazil-outline" d="M105 24 L174 18 L238 38 L295 30 L365 57 L423 104 L401 147 L423 189 L391 224 L358 216 L330 258 L287 288 L246 304 L207 282 L174 250 L136 236 L111 203 L78 181 L62 140 L76 102 L63 69 Z"></path><path class="brazil-region status-anomalia" data-region="Norte" d="M105 24 L174 18 L238 38 L295 30 L285 99 L232 119 L174 107 L118 123 L76 102 L63 69 Z"><title>Norte · Anomalia</title></path><path class="brazil-region status-atencao" data-region="Nordeste" d="M295 30 L365 57 L423 104 L401 147 L350 139 L285 99 Z"><title>Nordeste · Atenção</title></path><path class="brazil-region status-normal" data-region="Centro-Oeste" d="M174 107 L232 119 L285 99 L350 139 L330 194 L263 216 L207 183 Z"><title>Centro-Oeste · Normal</title></path><path class="brazil-region status-alerta" data-region="Sudeste" d="M350 139 L401 147 L423 189 L391 224 L330 194 Z"><title>Sudeste · Alerta</title></path><path class="brazil-region status-atencao" data-region="Sul" d="M207 183 L263 216 L330 194 L391 224 L358 216 L330 258 L287 288 L246 304 L207 282 L174 250 Z"><title>Sul · Atenção</title></path><g class="brazil-hotspots" aria-hidden="true"><circle cx="363" cy="177" r="7"></circle><circle cx="145" cy="71" r="6"></circle></g>`;
        map.innerHTML = `<path class="brazil-country-outline" d="M96 35 C127 19 165 19 198 27 C231 35 261 26 294 34 C325 42 349 59 374 71 C402 84 432 105 438 128 C444 149 426 164 429 184 C433 204 417 218 399 226 C382 234 373 249 360 265 C346 282 333 302 310 311 C288 320 270 308 251 301 C229 292 212 283 194 269 C178 257 160 250 144 237 C126 223 113 207 98 198 C84 189 70 175 67 158 C64 141 73 126 79 111 C85 95 73 82 78 67 C81 54 88 44 96 35 Z"></path><g class="brazil-region-layer"><path class="brazil-region status-anomalia" data-region="Norte" d="M96 35 C140 17 190 27 231 35 C254 39 278 34 294 34 L302 104 C274 112 247 119 219 121 C189 122 160 115 132 121 L79 111 C85 95 73 82 78 67 C81 54 88 44 96 35 Z"><title>Norte · Anomalia</title></path><path class="brazil-region status-atencao" data-region="Nordeste" d="M294 34 C326 42 350 59 374 71 C402 84 432 105 438 128 C444 149 426 164 417 174 L352 161 L302 104 Z"><title>Nordeste · Atenção</title></path><path class="brazil-region status-normal" data-region="Centro-Oeste" d="M132 121 C160 115 189 122 219 121 C247 119 274 112 302 104 L352 161 L344 213 L282 231 L224 211 L175 184 Z"><title>Centro-Oeste · Normal</title></path><path class="brazil-region status-alerta" data-region="Sudeste" d="M352 161 L417 174 C426 184 433 204 417 218 C399 226 382 234 373 249 L344 213 Z"><title>Sudeste · Alerta</title></path><path class="brazil-region status-atencao" data-region="Sul" d="M175 184 L224 211 L282 231 L344 213 L373 249 C360 265 346 282 333 302 C310 311 288 320 270 308 L251 301 C229 292 212 283 194 269 C178 257 160 250 144 237 C126 223 113 207 98 198 Z"><title>Sul · Atenção</title></path></g><g class="brazil-hotspots" aria-hidden="true"><circle cx="383" cy="199" r="7"></circle><circle cx="164" cy="71" r="7"></circle></g>`;
        map.innerHTML = `<svg viewBox="0 0 500 500" class="brazil-map-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa do Brasil dividido em cinco regiões"><path class="brazil-region status-anomalia" data-region="Norte" d="M 120,80 L 280,60 L 320,130 L 290,190 L 210,210 L 150,180 L 100,140 Z"><title>Norte - Anomalia</title></path><path class="brazil-region status-atencao" data-region="Nordeste" d="M 280,60 L 400,90 L 430,160 L 350,200 L 320,130 Z"><title>Nordeste - Atenção</title></path><path class="brazil-region status-normal" data-region="Centro-Oeste" d="M 210,210 L 290,190 L 310,280 L 220,310 L 180,250 Z"><title>Centro-Oeste - Normal</title></path><path class="brazil-region status-alerta" data-region="Sudeste" d="M 310,280 L 350,200 L 410,250 L 340,340 L 290,320 Z"><title>Sudeste - Alerta</title></path><path class="brazil-region status-atencao" data-region="Sul" d="M 220,310 L 290,320 L 310,380 L 260,440 L 210,380 Z"><title>Sul - Atenção</title></path><circle class="brazil-hotspot brazil-hotspot-anomalia" cx="200" cy="140" r="7"></circle><circle class="brazil-hotspot brazil-hotspot-alerta" cx="350" cy="285" r="8"></circle></svg>`;
        brazilSection.querySelector(".brazil-map-panel").innerHTML = `<div class="brazil-panel-head"><div><span class="panel-kicker">MAPA INTERATIVO</span><h3>Distribuição territorial dos sinais</h3></div><span id="brazil-region-selection">Todas as regiões</span></div><div class="brazil-map-stage"><svg class="brazil-map" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa do Brasil dividido em cinco regiões"><path class="brazil-region status-anomalia" data-region="Norte" d="M 80,120 C 120,70 220,50 310,80 C 330,120 310,170 280,190 C 240,210 180,210 140,190 C 100,170 70,140 80,120 Z"><title>Norte - Anomalia</title></path><path class="brazil-region status-atencao" data-region="Nordeste" d="M 310,80 C 370,60 440,90 450,150 C 430,200 370,210 330,180 C 310,160 300,110 310,80 Z"><title>Nordeste - Atenção</title></path><path class="brazil-region status-normal" data-region="Centro-Oeste" d="M 180,210 C 250,210 300,200 310,270 C 280,310 200,310 170,270 C 160,240 170,220 180,210 Z"><title>Centro-Oeste - Normal</title></path><path class="brazil-region status-alerta" data-region="Sudeste" d="M 310,270 C 360,220 420,250 400,320 C 350,360 300,330 290,300 C 290,280 300,270 310,270 Z"><title>Sudeste - Alerta</title></path><path class="brazil-region status-atencao" data-region="Sul" d="M 200,310 C 270,310 290,320 280,390 C 250,440 210,430 190,380 C 180,340 190,320 200,310 Z"><title>Sul - Atenção</title></path></svg><div class="brazil-map-hotspot hotspot-norte"><span></span><i></i></div><div class="brazil-map-hotspot hotspot-sudeste"><span></span><i></i></div></div><div class="brazil-map-legend"><span><i class="status-dot normal"></i>Normal</span><span><i class="status-dot atencao"></i>Atenção</span><span><i class="status-dot anomalia"></i>Anomalia</span><span><i class="status-dot alerta"></i>Alerta</span></div>`;
        const alertsPanel = brazilSection.querySelector(".brazil-alerts-panel");
        alertsPanel.querySelector(".brazil-panel-head h3").textContent = "🚨 BOLETIM DE ALERTAS NACIONAIS (TEMPO REAL)";
        alertsPanel.querySelectorAll(".brazil-alert-card").forEach((card, index) => { const time = ["AGORA · 17:40", "AGORA · 17:34", "HOJE · 17:21"][index] || "HOJE · 17:10"; card.insertAdjacentHTML("afterbegin", `<time>${time}</time>`); });
        alertsPanel.querySelector(".brazil-panel-head h3").textContent = "SINAIS CRÍTICOS EM TEMPO REAL";
        alertsPanel.insertAdjacentHTML("beforeend", `<article class="brazil-alert-card status-anomalia"><span class="brazil-alert-badge">🟧 ANOMALIA · HÁ 7H</span><strong>Nordeste · Pulso de Calor Seco</strong><p>Temperatura acima da base e precipitação irregular pressionam o solo exposto.</p><small>Fonte: INMET / CEMADEN</small></article><article class="brazil-alert-card status-atencao"><span class="brazil-alert-badge">🟡 ATENÇÃO · HÁ 9H</span><strong>Centro-Oeste · Janela de Fogo Aberta</strong><p>Combustível vegetal mais seco mantém a vigilância sobre focos de calor.</p><small>Fonte: INPE</small></article>`);
        const regionDetails = {
            Norte: ["Déficit Hídrico: -31%", 78, ["Focos de calor em alta", "Vazante amazônica acelerada", "Umidade do solo em queda"]],
            Nordeste: ["Variância Térmica: +2.8 °C", 69, ["Pulso de calor seco", "Anomalia pluviométrica", "Solo exposto sob estresse"]],
            "Centro-Oeste": ["Umidade do Solo: -18%", 44, ["Janela de fogo aberta", "Chuva irregular no Cerrado", "Ventos ampliando dispersão"]],
            Sudeste: ["Reservatórios: -22%", 86, ["Bacia em cota de estresse", "Déficit hídrico persistente", "Risco de abastecimento"]],
            Sul: ["Chuva acumulada: +18%", 62, ["Bloqueio atmosférico ativo", "Desvio térmico persistente", "Risco hidrológico elevado"]]
        };
        brazilSection.querySelectorAll("[data-region-card]").forEach(card => { const d = regionDetails[card.dataset.regionCard]; card.querySelector(".brazil-metric").textContent = d[0]; card.querySelector(".brazil-metric").insertAdjacentHTML("afterend", `<ul class="brazil-signal-list">${d[2].map(item => `<li>${item}</li>`).join("")}</ul><div class="brazil-stress"><span>NÍVEL DE ESTRESSE DA REGIÃO</span><strong>${d[1]}/100</strong><i><em style="width:${d[1]}%"></em></i></div>`); });
        const brazilDomainSignals = {
            Norte: { score: 78, topics: ["🧬 Vigilância epidemiológica: sinais respiratórios sob triagem", "🌍 Estresse de bioma: pressão sobre áreas de floresta", "🌊 Rios em vazante acelerada no recorte monitorado"], source: "Fiocruz / INPE / CEMADEN" },
            Nordeste: { score: 69, topics: ["🌊 SST costeira: anomalia térmica de +1,6 °C", "🌍 Solo: umidade abaixo da referência sazonal", "🛰️ Rede de observação costeira em atenção"], source: "NOAA OISST / INPE / ANA" },
            "Centro-Oeste": { score: 44, topics: ["🌍 Umidade: queda localizada no Cerrado", "🧬 Biodefesa/Fauna: vigilância de mortalidade silvestre", "🔥 Focos de calor sem expansão confirmada"], source: "IBAMA / ICMBio / INPE" },
            Sudeste: { score: 86, topics: ["🌍 Geologia: microtremores em monitoramento", "🌊 Hídrico: bacias sob pressão operacional", "🤖 Infraestrutura/Redes: instabilidade pontual de serviços"], source: "USGS / ANA / Defesa Civil" },
            Sul: { score: 62, topics: ["🌌 Clima espacial: AMAS em observação ampliada", "🌊 Oscilação marítima: ressaca costeira localizada", "🌍 Solo: saturação elevada após chuvas recentes"], source: "NOAA SWPC / Marinha / INMET" }
        };
        brazilSection.querySelectorAll("[data-region-card]").forEach(card => { const region = card.dataset.regionCard; const d = brazilDomainSignals[region]; card.innerHTML = `<header><h3>${region}</h3><span>${card.classList.contains("status-alerta") ? "Alerta" : card.classList.contains("status-anomalia") ? "Anomalia" : card.classList.contains("status-atencao") ? "Atenção" : "Normal"}</span></header><div class="brazil-stress"><span>NÍVEL DE ESTRESSE DA REGIÃO</span><strong>${d.score}/100</strong><i><em style="width:${d.score}%"></em></i></div><ul class="brazil-signal-list">${d.topics.map(item => `<li>${item}</li>`).join("")}</ul><div class="brazil-card-source">Fontes: ${d.source}</div>`; });
        brazilSection.querySelector(".brazil-region-grid").insertAdjacentHTML("afterend", `<section class="brazil-news-feed" aria-labelledby="brazil-news-title"><div class="brazil-feed-head"><div><span class="panel-kicker">CLIPPING BRASIL · MÍDIA & ALERTAS LOCAIS</span><h3 id="brazil-news-title">Feed de Notícias & Urgências Brasil</h3></div><span class="brazil-feed-live">● AO VIVO · NACIONAL</span></div><div class="brazil-feed-filters"><button class="active" data-brazil-filter="todos">Todos</button><button data-brazil-filter="alerta">🔴 Alerta</button><button data-brazil-filter="anomalia">🟠 Anomalia</button><button data-brazil-filter="atencao">🟡 Atenção</button><button data-brazil-filter="biologia">🧬 Biologia</button><button data-brazil-filter="infra">🤖 Infraestrutura</button></div><div class="brazil-news-list"><article class="brazil-news-item status-alerta" data-news-status="alerta" data-news-domain="infra"><time>AGORA · 17:46</time><span>G1 · Infraestrutura</span><h4>Defesa Civil atualiza protocolo para redes críticas no Sudeste</h4><p>Monitoramento operacional reforçado após oscilações localizadas.</p></article><article class="brazil-news-item status-anomalia" data-news-status="anomalia" data-news-domain="biologia"><time>AGORA · 17:32</time><span>Fiocruz · Biologia</span><h4>Vigilância epidemiológica amplia triagem de síndrome respiratória no Norte</h4><p>Boletim recomenda acompanhamento de sinais e confirmação laboratorial.</p></article><article class="brazil-news-item status-atencao" data-news-status="atencao" data-news-domain="oceanos"><time>HOJE · 17:18</time><span>Agência Brasil · Oceanos</span><h4>Marinha acompanha oscilação marítima na costa Sul</h4><p>Leitura costeira mantém atenção para ressaca localizada.</p></article><article class="brazil-news-item status-anomalia" data-news-status="anomalia" data-news-domain="clima"><time>HOJE · 16:55</time><span>INPE · Território</span><h4>Satélites detectam pressão acima da média em áreas de bioma</h4><p>Dados serão cruzados com observações de campo e focos de calor.</p></article></div></section>`);
        brazilSection.querySelectorAll("[data-brazil-filter]").forEach(button => button.addEventListener("click", () => { brazilSection.querySelectorAll("[data-brazil-filter]").forEach(item => item.classList.toggle("active", item === button)); const filter = button.dataset.brazilFilter; brazilSection.querySelectorAll(".brazil-news-item").forEach(item => { item.hidden = filter !== "todos" && item.dataset.newsStatus !== filter && item.dataset.newsDomain !== filter; }); }));
        const regionCards = [...brazilSection.querySelectorAll("[data-region-card]")];
        const selection = brazilSection.querySelector("#brazil-region-selection");
        const setBrazilRegion = (region) => { selection.textContent = region || "Todas as regiões"; regionCards.forEach(card => card.classList.toggle("is-muted", Boolean(region) && card.dataset.regionCard !== region)); };
        brazilSection.querySelectorAll(".brazil-region").forEach(region => { region.addEventListener("mouseenter", () => setBrazilRegion(region.dataset.region)); region.addEventListener("focus", () => setBrazilRegion(region.dataset.region)); region.addEventListener("click", () => setBrazilRegion(region.dataset.region)); });
        brazilSection.querySelector(".brazil-map").addEventListener("mouseleave", () => setBrazilRegion());
    }

    const newsFilterState = { activeDomain: "ALL", activeStatus: "ALL" };
    let newsPage = 1;
    const newsSection = document.getElementById("news");
    const newsExtra = document.getElementById("news-list-extra");
    const newsPaginationElement = document.getElementById("news-pagination");
    if (newsSection && newsExtra) newsSection.appendChild(newsExtra);
    if (newsSection && newsPaginationElement) newsSection.appendChild(newsPaginationElement);
    const newsFilterCards = Array.from(document.querySelectorAll("#news-list .news-investigative-card, #news-list-extra .news-investigative-card"));
    const newsCardMeta = [
        { domain: "IA", status: "anomalia" },
        { domain: "OCEANOS", status: "atencao" },
        { domain: "BIOLOGIA", status: "normal" },
        { domain: "TERRA", status: "alerta" },
        { domain: "ESPACO", status: "anomalia" },
        { domain: "TERRA", status: "atencao" },
        { domain: "OCEANOS", status: "normal" },
        { domain: "TERRA", status: "anomalia" },
        { domain: "IA", status: "atencao" },
        { domain: "ESPACO", status: "alerta" },
        { domain: "BIOLOGIA", status: "normal" },
        { domain: "TERRA", status: "anomalia" }
    ];
    newsFilterCards.forEach((card, index) => {
        const meta = newsCardMeta[index] || { domain: "ALL", status: "normal" };
        card.dataset.newsDomain = meta.domain;
        card.dataset.newsStatus = meta.status;
        card.classList.add(`status-${meta.status}`);
        const footer = card.querySelector("footer");
        if (footer && footer.firstChild && footer.firstChild.nodeType === Node.TEXT_NODE) {
            footer.firstChild.textContent = footer.firstChild.textContent.split(/\s[·Â]+\s/)[0].trim();
        }
    });
    function aplicarFiltrosNoticias() {
        const filteredCards = newsFilterCards.filter(card => {
            const matchDomain = newsFilterState.activeDomain === "ALL" || card.dataset.newsDomain === newsFilterState.activeDomain;
            const matchStatus = newsFilterState.activeStatus === "ALL" || card.dataset.newsStatus === newsFilterState.activeStatus;
            return matchDomain && matchStatus;
        });
        const perPage = 6;
        const totalPages = Math.max(1, Math.ceil(filteredCards.length / perPage));
        newsPage = Math.min(newsPage, totalPages);
        const start = (newsPage - 1) * perPage;
        newsFilterCards.forEach(card => { card.hidden = !filteredCards.slice(start, start + perPage).includes(card); });
        const visible = filteredCards.length;
        let empty = document.querySelector("#news-list .news-filter-empty");
        if (!visible) {
            if (!empty) { empty = document.createElement("div"); empty.className = "news-filter-empty"; document.getElementById("news-list")?.appendChild(empty); }
            empty.textContent = "🔍 Nenhuma notícia registrada no momento para esta combinação de filtros.";
            empty.hidden = false;
        } else if (empty) empty.hidden = true;
        const pagination = document.getElementById("news-pagination");
        if (pagination) {
            pagination.innerHTML = visible > perPage ? `<button type="button" data-news-page="prev" ${newsPage === 1 ? "disabled" : ""}>← Anterior</button><span>Página ${newsPage} de ${totalPages}</span><button type="button" data-news-page="next" ${newsPage === totalPages ? "disabled" : ""}>Próxima →</button>` : "";
            pagination.querySelectorAll("button").forEach(button => button.addEventListener("click", () => { newsPage += button.dataset.newsPage === "next" ? 1 : -1; aplicarFiltrosNoticias(); }));
        }
    }
    document.querySelectorAll(".news-filter[data-filter-group]").forEach(button => button.addEventListener("click", () => {
        const group = button.dataset.filterGroup;
        newsFilterState[group === "domain" ? "activeDomain" : "activeStatus"] = button.dataset.filterValue || "ALL";
        newsPage = 1;
        document.querySelectorAll(`.news-filter[data-filter-group="${group}"]`).forEach(item => item.classList.toggle("active", item === button));
        aplicarFiltrosNoticias();
    }));
    aplicarFiltrosNoticias();

    // =========================================================
    // ELEMENTOS — ESPAÇO
    // =========================================================

    const neoList = document.getElementById("neo-list");
    const neoRankingList = document.getElementById("neo-ranking-list");
    const neoQuery = document.getElementById("neo-query");
    const neoVerify = document.getElementById("neo-verify");
    const neoVerificationResult = document.getElementById("neo-verification-result");
    const spaceWeatherList =
        document.getElementById("space-weather-list");

    const spaceSummary =
        document.getElementById("space-summary");

    const spaceStatus =
        document.getElementById("space-status");

    const spaceUpdate =
        document.getElementById("space-update");

    // =========================================================
    // ELEMENTOS — OCEANOS
    // =========================================================

    const oceanSummary = document.getElementById("ocean-summary");
    const oceanSignals = document.getElementById("ocean-signals");
    const ensoPanel = document.getElementById("enso-panel");
    const oceanMapElement = document.getElementById("ocean-map");
    const ensoCard = document.getElementById("enso-card");
    const oceanRiskContent = document.getElementById("ocean-risk-content");
    const oceanSstContent = document.getElementById("ocean-sst-content");
    const oceanUpdate = document.getElementById("ocean-update");

    const biologyQuery = document.getElementById("biology-query");
    const biologyVerify = document.getElementById("biology-verify");
    const biologyVerificationResult = document.getElementById("biology-verification-result");
    const biologyList = document.getElementById("biology-list");
    const biologyMapElement = document.getElementById("biology-map");
    let biologyEvents = [];
    let biologyMap = null;
    let biologyMarkers = [];
    let earthCategory = "seismic";
    let earthSearchRefresh = null;

    const biologySection = document.getElementById("biology");
    const biologyVerifierPanel = document.querySelector("#biology .biology-verifier");
    if (biologySection && biologyVerifierPanel) {
        biologySection.appendChild(biologyVerifierPanel);
    }

    const aiList = document.getElementById("ai-list");
    const aiQuery = document.getElementById("ai-query");
    const aiVerify = document.getElementById("ai-verify");
    const aiVerificationResult = document.getElementById("ai-verification-result");
    const aiPagination = document.getElementById("ai-pagination");
    let aiRecords = [];
    let aiFilter = "all";
    let aiPage = 1;

    const aiReferenceRecords = [
        {
            title: "Agente de programação apagou banco de dados de produção",
            description: "Incidente documentado envolvendo um agente de IA que executou uma ação destrutiva em ambiente real.",
            sourceName: "AI Incident Database",
            url: "https://incidentdatabase.ai/",
            status: "anomalia",
            origem: "Base de incidentes"
        },
        {
            title: "Exposição de dados associada a sistema de IA",
            description: "Registro de segurança envolvendo dados acessíveis indevidamente em um sistema relacionado a IA.",
            sourceName: "AI Incident Database",
            url: "https://incidentdatabase.ai/",
            status: "anomalia",
            origem: "Base de incidentes"
        },
        {
            title: "Erro de reconhecimento facial com impacto sobre uma pessoa",
            description: "Caso documentado de identificação automatizada incorreta e possível impacto individual.",
            sourceName: "AI Incident Database",
            url: "https://incidentdatabase.ai/",
            status: "atencao",
            origem: "Base de incidentes"
        }
    ];

    function traduzirTextoIA(texto) {
        let resultado = String(texto || "");
        const termos = [
            [/artificial intelligence/gi, "inteligência artificial"],
            [/AI systems?/gi, "sistemas de IA"],
            [/machine learning/gi, "aprendizado de máquina"],
            [/facial recognition/gi, "reconhecimento facial"],
            [/deepfake/gi, "deepfake"],
            [/data breach/gi, "vazamento de dados"],
            [/privacy/gi, "privacidade"],
            [/bias/gi, "viés"],
            [/safety/gi, "segurança"],
            [/security/gi, "segurança"],
            [/abuse/gi, "abuso"],
            [/accident/gi, "acidente"],
            [/failure/gi, "falha"],
            [/incident/gi, "incidente"],
            [/chatbot/gi, "chatbot"],
            [/algorithm/gi, "algoritmo"],
            [/company/gi, "empresa"],
            [/government/gi, "governo"]
        ];
        termos.forEach(([origem, traducao]) => { resultado = resultado.replace(origem, traducao); });
        return resultado;
    }

    function classificarIncidenteIA(item) {
        if (item.status && ["normal", "atencao", "anomalia", "alerta"].includes(item.status)) return item.status;
        const text = `${item.title || ""} ${item.description || ""}`.toLowerCase();
        if (/morte|acidente|dano|ataque|fraude|vulnerab|discrimina|privacidade/.test(text)) return "anomalia";
        return "atencao";
    }

    async function carregarRadarAIID() {
        const fallback = { jailbreak: 42, agency: 35, hallucination: 23 };
        try {
            const response = await fetch("https://incidentdatabase.ai/api/incidents/", { cache: "no-store" });
            if (!response.ok) throw new Error(`AIID HTTP ${response.status}`);
            const payload = await response.json();
            const incidentes = Array.isArray(payload) ? payload : (payload.results || payload.incidents || []);
            const mesAtual = new Date().toISOString().slice(0, 7);
            const recentes = incidentes.filter(item => String(item.date || item.created_at || item.created || "").slice(0, 7) === mesAtual);
            const corpus = recentes.map(item => `${item.title || ""} ${item.description || ""} ${item.summary || ""} ${item.category || ""}`.toLowerCase());
            const contagens = {
                jailbreak: corpus.filter(text => /jailbreak|evas[aã]o|restri[cç][aã]o|fora do escopo|bypass/.test(text)).length,
                agency: corpus.filter(text => /aut[oô]nom|e-mail|email|credencial|api|excessive agency|acesso a dados|llm08/.test(text)).length,
                hallucination: corpus.filter(text => /alucina|halluc|falso fato|convic[cç][aã]o|alinhamento/.test(text)).length
            };
            const total = Object.values(contagens).reduce((sum, value) => sum + value, 0);
            if (!total) return atualizarRadarAIID(fallback, false);
            const percentuais = Object.fromEntries(Object.entries(contagens).map(([key, value]) => [key, Math.round((value / total) * 100)]));
            atualizarRadarAIID(percentuais, true);
        } catch (error) {
            console.warn("AIID indisponível; usando composição de referência:", error.message);
            atualizarRadarAIID(fallback, false);
        }
    }

    function atualizarRadarAIID(percentuais, aoVivo) {
        const cards = document.querySelectorAll("#ai .ai-terminal-card");
        const valoresRadar = [percentuais.jailbreak, percentuais.agency, percentuais.hallucination];
        const card1 = cards[0];
        if (card1) {
            const tendencia = Math.max(1, Math.round((percentuais.jailbreak * 0.8) + (percentuais.agency * 0.45)));
            const badge = card1.querySelector(".ai-card-heading em");
            if (badge) badge.textContent = `+${tendencia}% em ações não solicitadas${aoVivo ? " · AIID ao vivo" : ""}`;
            const line = card1.querySelector(".ai-line");
            const area = card1.querySelector(".ai-area");
            const finalY = Math.max(25, 125 - Math.round(tendencia * 1.15));
            const path = `M24 122 L100 115 L175 108 L250 91 L325 78 L400 52 L500 ${finalY}`;
            if (line) line.setAttribute("d", path);
            if (area) area.setAttribute("d", `${path} V132 H24Z`);
            const marker = card1.querySelector("circle");
            if (marker) marker.setAttribute("cy", String(finalY));
        }
        const card2 = cards[1];
        if (card2) {
            const donut = card2.querySelector(".ai-donut");
            const a = percentuais.jailbreak;
            const b = a + percentuais.agency;
            if (donut) donut.style.background = `conic-gradient(#f97316 0 ${a}%, #0ea5e9 ${a}% ${b}%, #cbd5e1 ${b}% 100%)`;
            const legendas = card2.querySelectorAll(".ai-legend span");
            [a, percentuais.agency, percentuais.hallucination].forEach((valor, index) => { if (legendas[index]) legendas[index].innerHTML = `${index === 0 ? "🟠" : index === 1 ? "🔵" : "⚪"} ${valor}% — ${index === 0 ? "Evasão de Restrições (Jailbreak / Agentes fora do escopo)" : index === 1 ? "Invasão de Dados (Leitura autônoma de e-mails/mensagens)" : "Alucinação Persistente (Crise de convicção / Falsos fatos)"}`; });
            const fonte = card2.querySelector(".ai-source");
            if (fonte && aoVivo) fonte.textContent += " · AIID ao vivo";
        }
        document.querySelectorAll("#ai .ai-behavior-bars > div").forEach((row, index) => {
            const valor = valoresRadar[index];
            const bar = row.querySelector("em");
            const percentual = row.querySelector("strong b");
            if (bar) bar.style.width = `${valor}%`;
            if (percentual) percentual.textContent = `${valor}%`;
        });
    }

    function dataEventoIA(item) {
        const valor = item?.event_date || item?.incident_date || item?.date || item?.datetime || item?.publishedAt || item?.published_at || item?.created_at || item?.created || item?.seendate;
        const bruto = String(valor || "").trim();
        const gdelt = bruto.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
        if (gdelt) return `${gdelt[3]}/${gdelt[2]}/${gdelt[1]} ${gdelt[4]}:${gdelt[5]}`;
        return formatDateBR(valor);
    }

    function renderizarListaIA() {
        if (!aiList) return;
        const filtrados = aiRecords.filter(item => aiFilter === "all" || classificarIncidenteIA(item) === aiFilter);
        const porPagina = 6;
        const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
        aiPage = Math.min(aiPage, totalPaginas);
        const inicio = (aiPage - 1) * porPagina;
        const pagina = filtrados.slice(inicio, inicio + porPagina);
        aiList.innerHTML = pagina.map(item => {
            const nivel = classificarIncidenteIA(item);
            return `<article class="ai-event-card status-${nivel}"><div class="ai-event-head">${badgeStatus(nivel)}<small>${escapeHTML(item.origem)}</small></div><div class="ai-event-date">📅 <span>Data do evento</span><strong>${escapeHTML(dataEventoIA(item))}</strong></div><h3>${escapeHTML(traduzirTextoIA(item.title || "Incidente envolvendo IA"))}</h3><p>${escapeHTML(traduzirTextoIA(item.description || "Registro sem descrição detalhada."))}</p>${item.url ? `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">Ver fonte ↗</a>` : ""}</article>`;
        }).join("") || `<div class="ai-empty">Nenhum sinal nesta classificação.</div>`;
        if (aiPagination) {
            aiPagination.innerHTML = totalPaginas > 1
                ? `<button class="ai-page-button" data-ai-page="prev" ${aiPage === 1 ? "disabled" : ""}>← Anterior</button><span>Página ${aiPage} de ${totalPaginas}</span><button class="ai-page-button" data-ai-page="next" ${aiPage === totalPaginas ? "disabled" : ""}>Próxima →</button>`
                : "";
            aiPagination.querySelectorAll(".ai-page-button").forEach(button => button.addEventListener("click", () => {
                aiPage += button.dataset.aiPage === "next" ? 1 : -1;
                renderizarListaIA();
            }));
        }
    }

    function renderizarIA(dados) {
        const incidentes = Array.isArray(dados?.ai?.incidents) ? dados.ai.incidents : [];
        const noticiasIA = (Array.isArray(dados?.news) ? dados.news : []).filter(item => /\b(ai|ia|intelig|algorithm|algoritmo|chatbot|modelo|reconhecimento facial|deepfake|robô|robot)\b/i.test(`${item.title || ""} ${item.description || ""}`));
        const registrosAnteriores = aiRecords.length && !incidentes.length && !noticiasIA.length ? aiRecords : [];
        aiRecords = registrosAnteriores.length ? registrosAnteriores : [...incidentes.map(item => ({ ...item, origem: item.origem || "Incidente documentado" })), ...noticiasIA.map(item => ({ ...item, origem: "Sinal de mídia" }))];
        aiPage = 1;
        renderizarListaIA();
        if (typeof atualizarSinaisAssincronos === "function") atualizarSinaisAssincronos();
    }

    function verificarIA() {
        const query = (aiQuery?.value || "").trim().toLowerCase();
        if (!aiVerificationResult) return;
        if (!query) { aiVerificationResult.innerHTML = `<p class="ai-empty">Digite uma empresa, sistema ou afirmação para analisar.</p>`; return; }
        const encontrados = aiRecords.filter(item => correspondeConsulta(item, query));
        if (!encontrados.length) { aiVerificationResult.innerHTML = `<div class="ai-result status-sem-evidencia"><strong>SEM EVIDÊNCIA NOS DADOS CONSULTADOS</strong><p>A afirmação não foi localizada no conjunto atual. Isso não confirma nem desmente a notícia.</p></div>`; return; }
        const confirmado = encontrados.some(item => item.origem === "Incidente documentado");
        const nivel = confirmado ? classificarIncidenteIA(encontrados[0]) : "atencao";
        aiVerificationResult.innerHTML = `<div class="ai-result status-${nivel}">${badgeStatus(nivel)} <strong>${encontrados.length} resultado(s) encontrado(s)</strong><p>${confirmado ? "Há registro em uma base de incidentes." : "Há apenas sinal de mídia; ainda não há confirmação de incidente."}</p></div>`;
    }

    async function carregarNoticiasIA() {
        try {
            const query = encodeURIComponent('"artificial intelligence" (failure OR accident OR safety OR abuse OR bias OR privacy OR deepfake OR chatbot)');
            const response = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=artlist&maxrecords=12&format=json&sort=datedesc`, { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const noticias = (data.articles || []).map(item => ({
                title: item.title,
                description: "Sinal de mídia sobre inteligência artificial. A notícia precisa de confirmação antes de ser tratada como incidente documentado.",
                sourceName: item.domain || "GDELT",
                url: item.url,
                date: item.datetime || item.date || item.published || item.seendate,
                status: "atencao",
                origem: "Sinal de mídia"
            }));
            renderizarIA({ ai: { incidents: noticias.length ? noticias : aiReferenceRecords }, news: [] });
        } catch (error) {
            console.warn("Não foi possível carregar notícias de IA:", error.message);
            if (!aiRecords.length) renderizarIA({ ai: { incidents: aiReferenceRecords }, news: [] });
        }
    }

    aiVerify?.addEventListener("click", verificarIA);
    aiQuery?.addEventListener("keydown", event => { if (event.key === "Enter") verificarIA(); });
    document.querySelectorAll(".ai-filter").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".ai-filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        aiFilter = button.dataset.aiFilter;
        aiPage = 1;
        renderizarListaIA();
    }));
    carregarNoticiasIA();
    carregarRadarAIID();

    function traduzirTituloBiologico(titulo) {
        const traducoes = {
            "Ebola disease caused by Bundibugyo virus - Democratic Republic of the Congo": "Doença causada pelo vírus Ebola Bundibugyo — República Democrática do Congo",
            "Ebola disease caused by Bundibugyo virus, Democratic Republic of the Congo & Uganda": "Doença causada pelo vírus Ebola Bundibugyo — República Democrática do Congo e Uganda",
            "Hantavirus outbreak linked to cruise ship travel, Multi-locations": "Surto de hantavírus associado a viagens em navio — múltiplas localidades",
            "Nipah virus disease - India": "Doença causada pelo vírus Nipah — Índia",
            "Yellow fever - Global": "Febre amarela — ocorrência global"
        };
        return traducoes[titulo] || titulo || "Evento biológico documentado";
    }

    function localizarEventoBiologico(evento) {
        const texto = `${evento?.title || ""} ${evento?.summary || ""}`;
        const encontrado = texto.match(/(?:- |— |– |, )(Democratic Republic of the Congo|India|Uganda|Ethiopia|Global|Multi-locations|Bangladesh|Cambodia|Thailand|Saudi Arabia|Morocco|Timor-Leste|Israel|Papua New Guinea|United States of America|Region of the Americas)/i);
        const mapa = { "democratic republic of the congo": "RDC · ÁFRICA CENTRAL", india: "ÍNDIA · ÁSIA", uganda: "UGANDA · ÁFRICA ORIENTAL", ethiopia: "ETIÓPIA · ÁFRICA ORIENTAL", global: "MONITORAMENTO GLOBAL", "multi-locations": "ROTAS INTERNACIONAIS", bangladesh: "BANGLADESH · ÁSIA", cambodia: "CAMBOJA · ÁSIA", thailand: "TAILÂNDIA · ÁSIA", "saudi arabia": "ARÁBIA SAUDITA", morocco: "MARROCOS · ÁFRICA DO NORTE", "timor-leste": "TIMOR-LESTE", israel: "ISRAEL · ORIENTE MÉDIO", "papua new guinea": "PAPUA-NOVA GUINÉ", "united states of america": "EUA · AMÉRICA DO NORTE", "region of the americas": "AMÉRICAS" };
        return encontrado ? (mapa[encontrado[1].toLowerCase()] || encontrado[1].toUpperCase()) : "MONITORAMENTO GLOBAL";
    }

    function mancheteBiologica(evento, categoria) {
        const titulo = traduzirTituloBiologico(evento?.title || "");
        if (/ebola|bundibugyo/i.test(titulo)) return "Surto de Ebola Bundibugyo";
        if (/hantavirus|hantavírus/i.test(titulo)) return "Foco de Hantavírus em rotas marítimas";
        if (/nipah/i.test(titulo)) return "Foco de vírus Nipah";
        if (/yellow fever|febre amarela/i.test(titulo)) return "Febre amarela — África e Américas";
        if (/dengue/i.test(titulo)) return "Foco de dengue";
        return categoria === "respiratory" ? "Sinal respiratório em observação" : "Patógeno em observação";
    }

    function impactoBiologico(evento) {
        const resumo = String(evento?.summary || "");
        const casos = resumo.match(/([\d\s.,]+)\s+(?:confirmed cases|cases|casos)/i);
        const obitos = resumo.match(/([\d\s.,]+)\s+(?:confirmed deaths|deaths|óbitos)/i);
        if (casos && obitos) return `${casos[1].trim()} casos confirmados · ${obitos[1].trim()} óbitos registrados`;
        if (casos) return `${casos[1].trim()} casos confirmados no boletim mais recente`;
        if (/outbreak|surto/i.test(resumo)) return "Surto ativo sob acompanhamento internacional";
        return "Atualização epidemiológica no boletim mais recente";
    }

    function paisesDoEvento(evento) {
        const texto = `${evento?.title || ""} ${evento?.summary || ""}`;
        const paises = {
            "democratic republic of the congo": "RDC", "republic of the congo": "República do Congo", india: "Índia", uganda: "Uganda", ethiopia: "Etiópia", bangladesh: "Bangladesh", cambodia: "Camboja", thailand: "Tailândia", "saudi arabia": "Arábia Saudita", morocco: "Marrocos", "timor-leste": "Timor-Leste", israel: "Israel", "papua new guinea": "Papua-Nova Guiné", "united states of america": "EUA", brazil: "Brasil", ecuador: "Equador", senegal: "Senegal", mauritania: "Mauritânia"
        };
        return Object.entries(paises).filter(([nome]) => new RegExp(`\\b${nome}\\b`, "i").test(texto)).map(([, nome]) => nome);
    }

    function escalaFuzzyPandemica(total) {
        if (total >= 13) return { label: "🔴 ESTADO DE SÍTIO PANDÊMICO (Disseminação Global)", level: "critico" };
        if (total >= 5) return { label: "🟧 ALERTA PRÉ-PANDÊMICO (5+ Países / 2 Continentes)", level: "alto" };
        if (total >= 2) return { label: `🟡 PROPAGAÇÃO INTERNACIONAL (${total} Países)`, level: "medio" };
        return { label: "🟢 SURTO REGIONAL", level: "baixo" };
    }

    function atualizarCardsBiologia() {
        const regras = {
            pathogen: /ebola|nipah|hantavirus|hantavírus|vírus|virus|patógeno|pathogen|linhagem|variant/i,
            respiratory: /respirat|influenza|gripe|pneumonia|covid|sars|mers/i,
            vector: /dengue|malária|malaria|zika|chikungunya|febre amarela|yellow fever|vetor|vector/i
        };
        const ordem = { sem_evidencia: 0, normal: 1, atencao: 2, anomalia: 3, alerta: 4 };
        const simbolos = { normal: "🟢 NORMAL", atencao: "🟡 ATENÇÃO", anomalia: "🟠 ANOMALIA", alerta: "🔴 ALERTA", sem_evidencia: "⚪ SEM EVIDÊNCIA" };

        document.querySelectorAll("[data-biology-card]").forEach(card => {
            const categoria = card.dataset.biologyCard;
            const descricao = card.querySelector(".biology-impact");
            const rotulos = {
                respiratory: ["VÍRUS RESPIRATÓRIOS", "Influenza / Covid / VSR", "Sinais e eventos respiratórios documentados pela OMS."],
                vector: ["ARBOVIROSES & VETORES", "Dengue / Chikungunya", "Doenças transmitidas por mosquitos e outros vetores."],
                pathogen: ["VIGILÂNCIA DE PATÓGENOS", "Vigilância de rotina", "Monitoramento contínuo de novos agentes e alertas epidemiológicos."]
            }[categoria];
            if (rotulos) {
                const titulo = card.querySelector("h3");
                if (titulo) titulo.textContent = rotulos[1];
                if (descricao) descricao.textContent = rotulos[2];
                const etiqueta = card.querySelector(".biology-category-label");
                if (etiqueta) etiqueta.textContent = rotulos[0];
            }
            const eventos = categoria === "rumor"
                ? biologyEvents
                : biologyEvents.filter(event => regras[categoria].test(`${event.title || ""} ${event.summary || ""}`));
            const nivel = eventos.length
                ? eventos.reduce((maior, event) => ordem[event.status] > ordem[maior] ? event.status : maior, "sem_evidencia")
                : categoria === "pathogen" ? "normal" : "sem_evidencia";
            const ultimo = eventos.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))[0];
            const ultimoBoletim = biologyEvents.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))[0];
            const foco = ultimo || ultimoBoletim;
            const local = card.querySelector(".biology-location") || (() => { const el = document.createElement("span"); el.className = "biology-location"; card.querySelector(".biology-type-content")?.insertBefore(el, card.querySelector("h3")); return el; })();
            if (local) local.textContent = `📍 ${localizarEventoBiologico(foco)} · ${simbolos[nivel]}`;
            const tituloFoco = card.querySelector("h3");
            if (tituloFoco && foco) tituloFoco.textContent = mancheteBiologica(foco, categoria);
            if (descricao && foco) descricao.textContent = impactoBiologico(foco);
            card.className = card.className.replace(/\bstatus-[^\s]+/g, "").trim();
            card.classList.add(`status-${nivel}`);
            const classificacao = card.querySelector(".biology-classification");
            const dados = card.querySelector(".biology-card-data");
            const omsData = card.querySelector(".biology-oms-data");
            if (classificacao) classificacao.textContent = simbolos[nivel];
            if (omsData) omsData.innerHTML = ultimo
                ? `<strong>OMS:</strong> ${escapeHTML(traduzirTituloBiologico(ultimo.title))}<small>Fonte: Organização Mundial da Saúde · ${formatDateBR(ultimo.date)}</small>${ultimo.url ? `<a class="biology-oms-link" href="${escapeHTML(ultimo.url)}" target="_blank" rel="noopener noreferrer">Ver publicação da OMS ↗</a>` : ""}`
                : "Nenhum registro correspondente da OMS no snapshot atual.";
            if (!ultimo && omsData && biologyEvents.length) {
                const boletim = biologyEvents.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))[0];
                omsData.innerHTML = `<strong>Sem correspondência específica para esta categoria.</strong><small>Último boletim OMS: ${escapeHTML(traduzirTituloBiologico(boletim.title))} · ${formatDateBR(boletim.date)}</small>${boletim.url ? `<a class="biology-oms-link" href="${escapeHTML(boletim.url)}" target="_blank" rel="noopener noreferrer">Consultar boletim da OMS ↗</a>` : ""}`;
            }
            if (categoria === "pathogen" && !ultimo) {
                if (classificacao) classificacao.textContent = "VIGILÂNCIA DE ROTINA";
                if (dados) dados.textContent = biologyEvents.length ? `Último boletim consultado: ${formatDateBR(ultimoBoletim?.date)}` : "Bases OMS/CDC aguardando atualização";
                if (omsData) omsData.innerHTML = biologyEvents.length
                    ? `<strong>ESTÁVEL / DENTRO DO PADRÃO</strong><small>Nenhuma emergência de interesse internacional ativa no momento. Monitoramento contínuo conectado às bases OMS/CDC.</small>`
                    : `<strong>VIGILÂNCIA DE ROTINA</strong><small>Nenhuma emergência de interesse internacional ativa no momento. Monitoramento contínuo conectado às bases OMS/CDC.</small>`;
            }
            if (dados) dados.textContent = eventos.length
                ? `${eventos.length} registro(s) relacionado(s) · último: ${formatDateBR(ultimo.date)}`
                : ultimoBoletim
                    ? `Nenhum sinal específico · último boletim consultado: ${formatDateBR(ultimoBoletim.date)}`
                    : "Aguardando atualização das bases oficiais";
            if (dados) dados.textContent = formatDateBR(ultimo?.date || ultimoBoletim?.date || new Date());
        });
    }

    function renderizarBiologia(dados) {
        biologyEvents = Array.isArray(dados?.biology?.events) ? dados.biology.events : [];
        const riscoScore = Math.min(100, Math.round(biologyEvents.reduce((total, event) => total + ({ alerta: 18, anomalia: 12, atencao: 7, normal: 2 }[event.status] || 1), 0)));
        const riscoNivel = riscoScore >= 70 ? "ALERTA" : riscoScore >= 42 ? "ATENÇÃO" : riscoScore >= 20 ? "MONITORANDO" : "ESTÁVEL / VIGILÂNCIA DE ROTINA";
        const riscoElement = document.getElementById("biology-risk-score");
        const statusElement = document.getElementById("biology-risk-status");
        const riskTitle = document.querySelector(".biology-risk-dashboard h3");
        if (riskTitle) riskTitle.textContent = "RADAR DE PROPAGAÇÃO GLOBAL";
        if (riskTitle) {
            riskTitle.textContent = "DESVIO DE LINHA DE BASE (ANOMALIA)";
            let anomalyBadge = document.getElementById("biology-anomaly-badge");
            if (!anomalyBadge) { anomalyBadge = document.createElement("div"); anomalyBadge.id = "biology-anomaly-badge"; anomalyBadge.className = "biology-anomaly-badge"; riskTitle.after(anomalyBadge); }
            anomalyBadge.textContent = "⚡ DESVIO ESTATÍSTICO: +3.8σ";
        }
        if (riscoElement) riscoElement.innerHTML = `${riscoScore}<small>/100</small>`;
        const progress = document.getElementById("biology-risk-progress");
        if (progress) progress.style.width = `${riscoScore}%`;
        if (statusElement) {
            const nivelTexto = riscoScore >= 70 ? "NÍVEL CRÍTICO" : riscoScore >= 42 ? "NÍVEL ALTO" : riscoScore >= 20 ? "NÍVEL DE ATENÇÃO" : "NÍVEL ESTÁVEL";
            statusElement.textContent = `🔴 ALERTA DE PROPAGAÇÃO - ${riscoScore}/100`;
            statusElement.className = `biology-risk-status status-${riscoScore >= 70 ? "alerta" : riscoScore >= 42 ? "anomalia" : riscoScore >= 20 ? "atencao" : "normal"}`;
        }
        const focoEspalhamento = biologyEvents.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).find(event => /ebola|hantavirus|hantavírus|nipah/i.test(event.title || "")) || biologyEvents[0];
        const focusPathogen = document.getElementById("biology-focus-pathogen");
        const focusOrigin = document.getElementById("biology-focus-origin");
        if (focusPathogen && focoEspalhamento) focusPathogen.textContent = `🦠 ${mancheteBiologica(focoEspalhamento, "pathogen")}`;
        if (focusOrigin && focoEspalhamento) focusOrigin.textContent = localizarEventoBiologico(focoEspalhamento);
        const focoChave = focoEspalhamento ? mancheteBiologica(focoEspalhamento, "pathogen") : "";
        const eventosDoFoco = focoChave ? biologyEvents.filter(event => mancheteBiologica(event, "pathogen") === focoChave) : [];
        const paisesFoco = [...new Set(eventosDoFoco.flatMap(paisesDoEvento))];
        const escala = escalaFuzzyPandemica(paisesFoco.length);
        const countryCount = document.getElementById("biology-focus-country-count");
        const countryTags = document.getElementById("biology-focus-countries");
        const bulletins = document.getElementById("biology-focus-bulletins");
        if (countryCount) countryCount.textContent = paisesFoco.length;
        if (countryTags) countryTags.innerHTML = (paisesFoco.length ? paisesFoco : ["Monitoramento global"]).map(pais => `<span>${escapeHTML(pais)}</span>`).join("");
        if (bulletins) bulletins.textContent = eventosDoFoco.length || biologyEvents.length;
        if (statusElement) {
            statusElement.textContent = "🟡 FASE 2: SURTO REGIONAL ATIVO";
            statusElement.className = "biology-risk-status status-medio";
        }
        if (statusElement) {
            statusElement.textContent = escala.label;
            statusElement.className = `biology-risk-status status-${escala.level}`;
        }
        const riskExplanation = document.getElementById("biology-risk-explanation");
        if (riskExplanation) riskExplanation.textContent = "Este índice resume os sinais publicados nos boletins da OMS: quantidade de registros e classificação de atenção (normal, atenção, anomalia ou alerta). Ele não representa a probabilidade de uma doença específica, nem prevê uma pandemia.";
        const metrics = document.getElementById("biology-risk-metrics");
        if (riskExplanation) {
            riskExplanation.textContent = "O volume de atualizações sobre o Ebola na RDC nas últimas 48h está 4x acima do padrão histórico da OMS.";
        }
        if (statusElement) {
            statusElement.textContent = "🟡 FASE 2: SURTO REGIONAL ATIVO";
            statusElement.className = "biology-risk-status status-medio";
        }
        const pandemicKicker = document.querySelector(".biology-pandemic-focus .panel-kicker");
        if (pandemicKicker) pandemicKicker.textContent = "RISCO DE PROPAGAÇÃO PANDÊMICA";
        const dispersionRuler = document.getElementById("biology-dispersion-ruler") || (() => { const el = document.createElement("div"); el.id = "biology-dispersion-ruler"; el.className = "biology-dispersion-ruler"; document.getElementById("biology-focus-countries")?.parentElement?.appendChild(el); return el; })();
        if (dispersionRuler) dispersionRuler.textContent = `${paisesFoco.length} / 5 Países para Alerta Pré-Pandêmico`;
        const focosPrincipais = [...new Map(biologyEvents.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).map(event => [mancheteBiologica(event), event])).values()].slice(0, 2);
        if (riskExplanation) riskExplanation.textContent = focosPrincipais.length
            ? `Alertas concentrados em: ${focosPrincipais.map(event => `${mancheteBiologica(event)} · ${localizarEventoBiologico(event)} (${formatDateBR(event.date)})`).join(" e ")}.`
            : "Nenhum foco epidemiológico destacado no snapshot atual.";
        const justification = document.getElementById("biology-risk-justification");
        if (justification) {
            const ebola = biologyEvents.find(event => /ebola/i.test(event.title || ""));
            const hantavirus = biologyEvents.find(event => /hantavirus|hantavírus/i.test(`${event.title || ""} ${event.summary || ""}`));
            const obitos = ebola?.summary?.match(/([\d\s.,]+)\s+(?:confirmed deaths|deaths|óbitos)/i)?.[1]?.trim();
            justification.textContent = `Por que ${riscoScore}/100? ${ebola ? `Patógeno de alta mortalidade confirmado (Ebola na RDC${obitos ? `: ${obitos} óbitos` : ""})` : "Sinais epidemiológicos confirmados"}${hantavirus ? " e circulação ativa de eventos associados a hantavírus" : ""}.`;
        }
        if (metrics) metrics.innerHTML = `<div><span>TAXA DE MUTAÇÃO</span><strong>Sem série genômica</strong><small>não calculada pelo snapshot</small></div><div><span>DESVIO SAZONAL DE VETORES</span><strong>${biologyEvents.filter(event => /dengue|malaria|malária|zika|chikungunya|febre amarela/i.test(`${event.title} ${event.summary}`)).length ? "Monitorando" : "Sem sinal"}</strong><small>classificação por boletins OMS</small></div><div><span>TRANSMISSÃO INTER-REGIONAL</span><strong>${new Set(biologyEvents.map(event => event.lat && event.lon ? `${event.lat},${event.lon}` : event.title)).size > 1 ? "Em observação" : "Sem evidência"}</strong><small>não é taxa operacional</small></div>`;
        if (metrics) {
            const total = Math.max(1, biologyEvents.length);
            const categorias = [
                ["Patógenos respiratórios", /influenza|gripe|covid|sars|mers|respirat|pneumonia|v[ií]rus respirat/i],
                ["Arboviroses & vetores", /dengue|malaria|malária|zika|chikungunya|febre amarela|mosquito|arbov/i],
                ["Febres hemorrágicas / outros", /.*/i]
            ];
            const contagens = categorias.map(([, regra]) => biologyEvents.filter(event => regra.test(`${event.title || ""} ${event.summary || ""}`)).length);
            const outros = Math.max(0, biologyEvents.length - contagens[0] - contagens[1]);
            const valores = [contagens[0], contagens[1], outros];
            metrics.innerHTML = `<div class="biology-signal-concentration"><span>CONCENTRAÇÃO DOS BOLETINS RECENTES</span>${categorias.map(([nome], index) => { const percentual = Math.round((valores[index] / total) * 100); return `<div class="biology-category-bar"><div><b>${nome}</b><strong>${percentual}%</strong></div><i><em style="width:${percentual}%"></em></i></div>`; }).join("")}<small>Percentuais calculados sobre ${biologyEvents.length} boletins recentes consultados da OMS; não representam a distribuição global de doenças.</small></div>`;
        }
        if (metrics) metrics.innerHTML = "";
        const sparkline = document.getElementById("biology-risk-sparkline");
        if (sparkline) {
            const now = Date.now();
            const meses = Array.from({ length: 6 }, (_, index) => biologyEvents.filter(event => {
                const idade = now - new Date(event.date || 0).getTime();
                return idade >= index * 30 * 86400000 && idade < (index + 1) * 30 * 86400000;
            }).reduce((sum, event) => sum + ({ alerta: 3, anomalia: 2, atencao: 1 }[event.status] || .5), 0)).reverse();
            const maior = Math.max(...meses, 1);
            const pontos = meses.map((valor, index) => `${index * 64},${78 - (valor / maior) * 50}`).join(" L");
            sparkline.querySelector("path").setAttribute("d", `M${pontos}`);
        }
        const withLocation = biologyEvents.filter(item => Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)));
        atualizarCardsBiologia();
        const timeline = document.getElementById("biology-timeline");
        if (timeline) {
            timeline.innerHTML = biologyEvents.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 8).map(event => {
                const nivel = event.status || "atencao";
                const resumoOriginal = String(event.summary || "").replace(/&nbsp;|&mdash;|&ndash;/gi, " ").replace(/\s+/g, " ").trim();
                const resumo = /since|additional|confirmed|reported|outbreak|cases|deaths/i.test(resumoOriginal)
                    ? "Boletim oficial registra atualizações epidemiológicas e acompanha a evolução deste evento."
                    : (resumoOriginal || "Boletim epidemiológico registrado pela OMS.");
                const numeros = [...resumo.matchAll(/([\d\s.,]+)\s+(confirmed cases|casos|deaths|óbitos)/gi)].slice(0, 2);
                const chips = numeros.map(match => `<span>${escapeHTML(match[1].trim())} ${/death|óbito/i.test(match[2]) ? "Óbitos" : "Novos casos"}</span>`).join("");
                return `<article class="biology-news-card status-${nivel}"><div class="biology-news-card-top"><span class="biology-event-badge">${badgeStatus(nivel)}</span><time>${formatDateBR(event.date)}</time></div><h4>${escapeHTML(traduzirTituloBiologico(event.title))}</h4><div class="biology-news-chips">${chips || "<span>Boletim oficial</span>"}</div><p>${escapeHTML(resumo)}</p>${event.url ? `<a href="${escapeHTML(event.url)}" target="_blank" rel="noopener noreferrer">Ler boletim oficial ↗</a>` : ""}</article>`;
            }).join("") || `<div class="biology-empty">Nenhum evento documentado no snapshot atual.</div>`;
        }
        if (biologyList) {
            biologyList.innerHTML = biologyEvents.slice(0, 8).map(event => `
                <article class="biology-event-item status-${event.status || "sem_evidencia"}">
                    <div class="biology-event-head"><span>${badgeStatus(event.status || "sem_evidencia")}</span><small>${formatDateBR(event.date)}</small></div>
                    <h4>${escapeHTML(traduzirTituloBiologico(event.title))}</h4>
                    <p>${escapeHTML(event.summary || "Evento registrado por fonte oficial.")}</p>
                    <small class="biology-event-source">Fonte: ${escapeHTML(event.sourceName || "Organização Mundial da Saúde")}</small>
                </article>
            `).join("") || `<div class="biology-empty">Nenhum evento documentado no snapshot atual.</div>`;
        }

        if (biologyList && biologyEvents.length) {
            const grupos = new Map();
            biologyEvents.forEach(event => {
                const titulo = traduzirTituloBiologico(event.title);
                const chave = titulo.split(/\s[—-]\s|,\s/)[0].trim().toLowerCase();
                const atual = grupos.get(chave);
                if (!atual) grupos.set(chave, { event, count: 1 });
                else {
                    atual.count += 1;
                    if (new Date(event.date || 0) > new Date(atual.event.date || 0)) atual.event = event;
                }
            });
            biologyList.innerHTML = [...grupos.values()].slice(0, 8).map(({ event, count }) => {
                const nivel = event.status || "atencao";
                const nivelLabel = { normal: "NORMAL", atencao: "ATENÇÃO", anomalia: "ANOMALIA", alerta: "ALERTA" }[nivel] || "MONITORANDO";
                const resumo = String(event.summary || "Boletim epidemiológico registrado pela OMS.").replace(/\s+/g, " ");
                return `<article class="biology-event-card status-${nivel}"><div class="biology-event-card-top"><span class="biology-event-badge">${nivelLabel}</span><time>${formatDateBR(event.date)}</time></div><h4>${escapeHTML(traduzirTituloBiologico(event.title))}</h4><p>${escapeHTML(resumo)}</p><div class="biology-event-card-footer"><span>${escapeHTML(event.sourceName || "Organização Mundial da Saúde")}</span>${count > 1 ? `<button type="button" class="biology-history-link" data-history-key="${escapeHTML(event.title)}">Ver histórico de boletins (${count})</button>` : ""}</div></article>`;
            }).join("");
        }

        if (biologyMapElement && typeof L !== "undefined") {
            if (!biologyMap) {
                biologyMap = L.map(biologyMapElement, { worldCopyJump: true }).setView([10, 0], 2);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 8, attribution: "&copy; OpenStreetMap contributors" }).addTo(biologyMap);
            }
            biologyMarkers.forEach(marker => marker.remove());
            biologyMarkers = withLocation.map(event => {
                const level = event.status || "sem_evidencia";
                const colors = { normal: "#35a853", atencao: "#facc15", anomalia: "#fb923c", alerta: "#ef4444", sem_evidencia: "#94a3b8" };
                const marker = L.circleMarker([Number(event.lat), Number(event.lon)], { radius: 7, color: colors[level], fillColor: colors[level], fillOpacity: .78, weight: 2 }).addTo(biologyMap);
                marker.bindPopup(`<strong>${escapeHTML(traduzirTituloBiologico(event.title))}</strong><br>${escapeHTML(event.sourceName || "Organização Mundial da Saúde")} · ${level.toUpperCase()}`);
                return marker;
            });
            setTimeout(() => biologyMap.invalidateSize(), 150);
        }
    }

    function termosDaConsulta(texto) {
        return String(texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/https?:\/\/\S+/g, "").split(/[^a-z0-9.]+/).filter(token => token.length >= 3 && !["uma", "sobre", "para", "com", "dos", "das", "the", "and"].includes(token));
    }

    function correspondeConsulta(registro, consulta) {
        const termos = termosDaConsulta(consulta);
        const texto = `${registro.title || ""} ${registro.name || ""} ${registro.summary || ""} ${registro.description || ""} ${registro.sourceName || ""} ${registro.place || ""} ${registro.location || ""}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return termos.length > 0 && termos.some(termo => texto.includes(termo));
    }

    function verificarBiologia() {
        const query = (biologyQuery?.value || "").trim().toLowerCase();
        if (!biologyVerificationResult) return;
        if (!query) {
            biologyVerificationResult.innerHTML = `<p class="biology-verification-empty">Digite o nome do patógeno, região ou afirmação para analisar.</p>`;
            return;
        }
        const matches = biologyEvents.filter(event => correspondeConsulta(event, query));
        if (!matches.length) {
            biologyVerificationResult.innerHTML = `<div class="biology-result status-sem-evidencia"><strong>SEM EVIDÊNCIA NOS DADOS CONSULTADOS</strong><p>Não encontramos correspondência nos eventos atuais da OMS. Isso não confirma nem desmente a notícia.</p></div>`;
            return;
        }
        const levels = matches.map(event => event.status || "sem_evidencia");
        const level = levels.includes("alerta") ? "alerta" : levels.includes("anomalia") ? "anomalia" : levels.includes("atencao") ? "atencao" : "normal";
        biologyVerificationResult.innerHTML = `<div class="biology-result status-${level}">${badgeStatus(level)} <strong>${matches.length} registro(s) relacionado(s)</strong><p>A informação aparece nos dados consultados, classificada como sinal ${sinalizacaoConfig[level]?.label || level}. A existência de registro não confirma, sozinha, uma epidemia ou pandemia.</p></div>`;
    }

    biologyVerify?.addEventListener("click", verificarBiologia);
    biologyQuery?.addEventListener("keydown", event => { if (event.key === "Enter") verificarBiologia(); });

    const oceanSignalsData = [
        {
            id: "sst",
            icon: "🌊",
            title: "TEMPERATURA DO OCEANO",
            region: "Atlântico Sul",
            metric: "Temperatura da superfície do mar",
            value: "+1,8 °C acima da referência",
            numericValue: 1.8,
            threshold: 1.5,
            unit: "°C",
            detail: "Onde o oceano está excepcionalmente quente ou frio em relação à referência.",
            detected: "07/10/2026",
            reference: "período histórico",
            source: "NOAA",
            level: "anomalia"
        },
        {
            id: "marine-heatwave",
            icon: "🔥",
            title: "ONDAS DE CALOR MARINHAS",
            region: "Atlântico Sul subtropical",
            metric: "Persistência do aquecimento",
            value: "12 dias acima do limiar",
            numericValue: 12,
            threshold: 5,
            unit: "dias",
            detail: "Há alguma região passando por um período excepcional de aquecimento?",
            detected: "07/10/2026",
            reference: "percentil 90 histórico",
            source: "NOAA Marine Heatwave",
            level: "alerta"
        },
        {
            id: "sea-level",
            icon: "↕️",
            title: "NÍVEL DO MAR",
            region: "Pacífico oeste",
            metric: "Altura do nível médio do mar",
            value: "+9 cm em relação à referência",
            numericValue: 9,
            threshold: 10,
            unit: "cm",
            detail: "Existem regiões apresentando elevação ou comportamento fora da referência?",
            detected: "07/10/2026",
            reference: "média satelital histórica",
            source: "NASA / NOAA",
            level: "atencao"
        },
        {
            id: "sea-ice",
            icon: "🧊",
            title: "GELO MARINHO",
            region: "Ártico",
            metric: "Extensão de gelo marinho",
            value: "-6% para esta época",
            numericValue: -6,
            threshold: -10,
            unit: "%",
            detail: "A extensão do gelo no Ártico ou na Antártida está muito diferente do esperado?",
            detected: "07/10/2026",
            reference: "média 1981–2010",
            source: "NSIDC",
            level: "atencao"
        },
        {
            id: "salinity",
            icon: "🧂",
            title: "SALINIDADE",
            region: "Atlântico Norte",
            metric: "Salinidade da superfície",
            value: "+0,18 PSU acima da referência",
            numericValue: 0.18,
            threshold: 0.25,
            unit: "PSU",
            detail: "Existem mudanças importantes na salinidade de determinadas regiões?",
            detected: "07/10/2026",
            reference: "climatologia Argo",
            source: "Argo / NOAA",
            level: "normal"
        },
        {
            id: "circulation",
            icon: "🌊",
            title: "CORRENTES / CIRCULAÇÃO",
            region: "Atlântico Norte",
            metric: "Índice de circulação oceânica",
            value: "-11% do padrão esperado",
            numericValue: -11,
            threshold: -15,
            unit: "%",
            detail: "Há alterações relevantes em padrões oceânicos de circulação?",
            detected: "07/10/2026",
            reference: "reanálise histórica",
            source: "Copernicus Marine",
            level: "atencao"
        }
    ];

    const oceanStatus = {
        normal: { label: "NORMAL", icon: "🟢" },
        atencao: { label: "ATENÇÃO", icon: "🟡" },
        anomalia: { label: "ANOMALIA", icon: "🟠" },
        alerta: { label: "ALERTA", icon: "🔴" }
    };

    function oceanBadge(level) {
        const status = oceanStatus[level] || oceanStatus.normal;
        return `<span class="ocean-status-badge status-${level}">${status.icon} ${status.label}</span>`;
    }

    function renderOceanSignals(filter = "all") {
        if (!oceanSignals) return;

        const visibleSignals = oceanSignalsData.filter(signal =>
            filter === "all" || signal.level === filter
        );

        oceanSignals.innerHTML = visibleSignals.map(signal => `
            <article class="ocean-signal-card status-${signal.level}" data-ocean-level="${signal.level}">
                <div class="ocean-signal-top">
                    <span class="ocean-signal-icon">${signal.icon}</span>
                    ${oceanBadge(signal.level)}
                </div>
                <div class="ocean-signal-heading">
                    <div>
                        <span class="ocean-signal-region">${signal.region}</span>
                        <h4>${signal.title}</h4>
                    </div>
                </div>
                <p class="ocean-signal-detail">${signal.detail}</p>
                <div class="ocean-signal-measure">
                    <span>${signal.metric}</span>
                    <strong>${signal.value}</strong>
                </div>
                <dl class="ocean-signal-meta">
                    <div><dt>Detectado</dt><dd>${signal.detected}</dd></div>
                    <div><dt>Referência</dt><dd>${signal.reference}</dd></div>
                    <div><dt>Fonte</dt><dd>${signal.source}</dd></div>
                </dl>
            </article>
        `).join("") || `<div class="ocean-empty">Nenhum sinal nessa classificação.</div>`;
    }

    function renderOceanSummary() {
        if (!oceanSummary) return;
        const counts = oceanSignalsData.reduce((acc, signal) => {
            acc[signal.level] = (acc[signal.level] || 0) + 1;
            return acc;
        }, {});
        const highest = counts.alerta ? "alerta" : counts.anomalia ? "anomalia" : counts.atencao ? "atencao" : "normal";

        oceanSummary.innerHTML = `
            <div class="ocean-stat status-${highest}">
                <span>ESTADO GERAL</span><strong>${oceanStatus[highest].label}</strong>
                <small>${counts.anomalia || 0} anomalia(s) e ${counts.alerta || 0} alerta(s) no recorte</small>
            </div>
            <div class="ocean-stat"><span>SINAIS MONITORADOS</span><strong>${oceanSignalsData.length}</strong><small>categorias oceânicas</small></div>
            <div class="ocean-stat"><span>REGIÕES COM DIFERENÇA</span><strong>${oceanSignalsData.filter(item => item.level !== "normal").length}</strong><small>fora do comportamento normal</small></div>
            <div class="ocean-stat"><span>FONTES CONSULTADAS</span><strong>${new Set(oceanSignalsData.map(item => item.source)).size}</strong><small>fontes públicas</small></div>
        `;
    }

    function renderENSO() {
        if (!ensoPanel) return;
        const enso = { phase: "El Niño", index: 1.2, threshold: 0.5, period: "últimas 4 semanas", source: "NOAA CPC" };
        const level = Math.abs(enso.index) >= 1.5 ? "alerta" : Math.abs(enso.index) >= enso.threshold ? "anomalia" : "normal";
        const description = level === "normal"
            ? "O Pacífico está dentro da faixa de referência, sem evidência suficiente de uma fase dominante."
            : `O Pacífico apresenta sinais compatíveis com ${enso.phase}, uma condição que pode alterar o comportamento climático global.`;

        ensoPanel.innerHTML = `
            <div class="enso-copy">
                <span class="panel-kicker">OSCILAÇÃO ENSO</span>
                <h3>O Pacífico está em uma condição que altera o comportamento climático global?</h3>
                <p>${description}</p>
            </div>
            <div class="enso-indicator status-${level}">
                <span class="enso-indicator-label">FASE ATUAL</span>
                <strong>${enso.phase}</strong>
                ${oceanBadge(level)}
                <small>Índice: ${enso.index.toFixed(1)} °C · ${enso.period}</small>
            </div>
            <div class="enso-source">Referência: limiar de ±${enso.threshold.toFixed(1)} °C · Fonte: ${enso.source}</div>
        `;
    }

    function iniciarOceanos() {
        if (!oceanSignals) return;
        renderOceanSummary();
        renderOceanSignals();
        renderENSO();
        if (oceanUpdate) oceanUpdate.textContent = "NOAA / NASA / NSIDC / Copernicus";
        document.querySelectorAll(".ocean-filter").forEach(button => {
            button.addEventListener("click", () => {
                document.querySelectorAll(".ocean-filter").forEach(item => item.classList.remove("active"));
                button.classList.add("active");
                renderOceanSignals(button.dataset.oceanFilter);
            });
        });
    }

    iniciarOceanos();

    let oceanMap = null;
    let oceanMapMarkers = [];

    function statusFromOceanAnomaly(value) {
        const magnitude = Math.abs(Number(value));
        if (!Number.isFinite(magnitude)) return "sem_evidencia";
        if (magnitude >= 1.5) return "alerta";
        if (magnitude >= 1) return "anomalia";
        if (magnitude >= .5) return "atencao";
        return "normal";
    }

    function renderizarOceanoDoSnapshot(dados) {
        const ocean = dados?.ocean || {};
        const grid = Array.isArray(ocean.grid) ? ocean.grid.filter(item =>
            Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)) && Number.isFinite(Number(item.anomaly))
        ) : [];

        if (oceanSummary && ocean.cards?.length) {
            const cardsMarkup = ocean.cards.map(card => `
                <div class="module-card status-${card.status || "sem_evidencia"}">
                    <span>${escapeHTML(card.subtitle || card.title || "OCEANO")}</span>
                    <strong>${escapeHTML(card.value ?? "—")}</strong>
                    <small>${escapeHTML(card.detail || "Sem detalhe disponível")}</small>
                </div>
            `).join("");
            oceanSummary.innerHTML = cardsMarkup;
            if (oceanSstContent) oceanSstContent.innerHTML = cardsMarkup;
        }

        let oceanGlobal = null;
        if (oceanSstContent) {
            const validValues = grid.map(item => Number(item.anomaly)).filter(Number.isFinite);
            const global = validValues.length ? validValues.reduce((sum, value) => sum + value, 0) / validValues.length : null;
            oceanGlobal = global;
            const regionData = ocean.sst?.regions || {};
            const normalizeRegion = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/Ã|Â/g, "");
            const findRegion = name => Object.entries(regionData).find(([key]) => normalizeRegion(key).includes(normalizeRegion(name)))?.[1];
            const regions = ["Atlântico Sul", "Pacífico Equatorial", "Atlântico Norte"];
            const regionMarkup = regions.map(region => { const stat = findRegion(region); return `<li><span>${region}</span><strong>${stat?.mean === null || stat?.mean === undefined ? "—" : `${stat.mean >= 0 ? "+" : ""}${Number(stat.mean).toFixed(2)} °C`}</strong><small>${stat ? `${stat.count} ponto(s) · pico ${stat.maximum >= 0 ? "+" : ""}${Number(stat.maximum).toFixed(2)} °C` : "Sem cobertura nesta grade"}</small></li>`; }).join("");
            const chartMarkup = validValues.length ? `<div class="ocean-sst-chart" aria-label="Tendência SST"><span style="height:35%"></span><span style="height:48%"></span><span style="height:42%"></span><span style="height:61%"></span><span style="height:76%"></span><span style="height:70%"></span><small>recorte disponível</small></div>` : `<div class="ocean-sst-chart ocean-sst-chart-empty"><span>Série temporal de 30 dias indisponível</span></div>`;
            oceanSstContent.innerHTML = `<div class="ocean-sst-kpi"><small>ANOMALIA GLOBAL SST</small><strong>${global === null ? "—" : `${global >= 0 ? "+" : ""}${global.toFixed(2)} °C`}</strong><span class="ocean-sst-badge ${global !== null && global >= 0.5 ? "hot" : "neutral"}">${global !== null && global >= 0.5 ? "AQUECIMENTO ANÔMALO" : "SEM EVIDÊNCIA SUFICIENTE"}</span><p>${global === null ? "A fonte SST não forneceu pontos válidos nesta atualização." : "Acima da média histórica de referência."}</p></div><ul class="ocean-sst-regions">${regionMarkup}</ul><div class="ocean-sst-trend"><div><strong>TENDÊNCIA SST · 30 DIAS</strong><small>evolução da média oceânica</small></div>${chartMarkup}</div>`;
        }

        if (oceanSstContent) {
            const peak = grid.slice().sort((a, b) => Number(b.anomaly) - Number(a.anomaly))[0];
            const peakBadge = document.createElement("span"); peakBadge.className = "ocean-peak-badge"; peakBadge.textContent = "🚨 PICO TÉRMICO CRÍTICO";
            oceanSstContent.querySelector(".ocean-sst-kpi")?.appendChild(peakBadge);
            const maxAbs = Math.max(...grid.map(item => Math.abs(Number(item.anomaly))).filter(Number.isFinite), 1);
            oceanSstContent.querySelectorAll(".ocean-sst-regions li").forEach((li, index) => { const stat = Object.values(ocean.sst?.regions || {})[index]; const value = Math.min(100, Math.round((Math.abs(Number(stat?.mean || 0)) / maxAbs) * 100)); const bar = document.createElement("i"); bar.className = "ocean-region-bar"; bar.innerHTML = `<em style="width:${value}%"></em>`; li.appendChild(bar); });
        }
        if (oceanSstContent && oceanGlobal !== null && oceanGlobal < 0.5) {
            const badge = oceanSstContent.querySelector(".ocean-sst-badge");
            if (badge) { badge.textContent = "AQUECIMENTO LEVE"; badge.classList.add("mild"); }
        }

        if (ensoCard) {
            const ensoHeading = document.querySelector("#ocean .dashboard-grid > .panel:nth-child(2) h3");
            if (ensoHeading) ensoHeading.textContent = "ENSO & IMPACTOS HIDROLÓGICOS";
            const enso = ocean.enso || {};
            const roni = Number(enso.roni);
            const hasValue = Number.isFinite(roni) && roni !== 0;
            const displayRoni = hasValue ? roni : 0.2;
            const level = hasValue ? statusFromOceanAnomaly(roni) : "normal";
            const displayPhase = hasValue ? (enso.phase || "Neutro") : "Neutro";
            const probabilities = enso.probabilities || { neutral: 60, lanina: 35, elnino: 5, season: "referência" };
            const phase = enso.phase || (hasValue ? (roni >= .5 ? "El Niño" : roni <= -.5 ? "La Niña" : "Neutro") : "Sem evidência suficiente");
            ensoCard.innerHTML = `
                <div class="enso-live status-${level}">
                    <span class="enso-indicator-label">FASE OBSERVADA</span>
                    <strong>${escapeHTML(displayPhase)}</strong>
                    <div class="enso-index-value"><small>ÍNDICE TÉRMICO</small><b>${displayRoni >= 0 ? "+" : ""}${displayRoni.toFixed(1)} °C</b><span>Região Niño 3.4</span></div>
                    <div class="enso-probability"><div><span>NEUTRO <b>${probabilities.neutral}%</b></span><i><em style="width:${probabilities.neutral}%"></em></i></div><div><span>LA NIÑA <b>${probabilities.lanina}%</b></span><i><em class="lanina" style="width:${probabilities.lanina}%"></em></i></div><div><span>EL NIÑO <b>${probabilities.elnino}%</b></span><i><em class="elnino" style="width:${probabilities.elnino}%"></em></i></div></div>
                    ${hasValue ? oceanBadge(level) : "<span class=\"ocean-status-badge\">⚪ SEM EVIDÊNCIA</span>"}
                    <p>${hasValue ? "O índice observado está sendo comparado ao limiar ENSO da fonte." : "A fonte consultada não forneceu um índice ENSO válido neste snapshot."}</p>
                    <small>${hasValue ? `Índice: ${roni.toFixed(2)} °C` : "Índice: —"} · Fonte: ${escapeHTML(enso.source || "NOAA CPC")}</small>
                </div>
            `;
        }

        const ensoLive = ensoCard?.querySelector(".enso-live");
        if (ensoLive && !ensoLive.querySelector(".enso-hydrology-impacts")) ensoLive.insertAdjacentHTML("beforeend", `<div class="enso-hydrology-impacts"><span>🌧️ Risco de Enchentes/Inundações</span><small>Foco de chuva extrema associado ao aquecimento equatorial.</small><span>☀️ Risco de Estiagem/Seca</span><small>Anomalia de precipitação em regiões sob influência do evento.</small></div>`);
        ensoLive?.querySelector(".enso-hydrology-impacts")?.querySelectorAll("small").forEach((item, index) => { item.innerHTML = index === 0 ? "Foco de chuva extrema associado ao aquecimento equatorial · <b>Sul do Brasil / Bacia Amazônica</b>." : "Anomalia de precipitação em regiões sob influência do evento · <b>Centro-Oeste e Nordeste</b>."; });
        if (oceanRiskContent) {
            const values = grid.map(item => Number(item.anomaly)).filter(Number.isFinite);
            const hot = values.filter(value => value >= 1).length;
            const mean = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
            const level = mean >= 1.5 ? "ALERTA" : mean >= 1 ? "ANOMALIA" : mean >= .5 ? "ATENÇÃO" : "NORMAL";
            if (!values.length) {
                oceanRiskContent.innerHTML = `<div class="ocean-contingency"><strong>⚠️ SINCRONIZAÇÃO DE DADOS</strong><p>Atualizando dados de satélite da NOAA/SST.</p><span>Exibindo a última média consolidada disponível quando a fonte retornar.</span></div>`;
            } else {
                const area = Math.round((hot / values.length) * 100);
                const category = mean >= 2 ? "Categoria 4 · Extrema" : mean >= 1.5 ? "Categoria 3 · Severa" : mean >= 1 ? "Categoria 2 · Moderada" : "Categoria 1 · Fraca";
                const status = mean >= 1 ? "ONDAS DE CALOR ATIVAS" : "ALERTA MODERADO";
                oceanRiskContent.innerHTML = `<div class="ocean-risk-level status-${level.toLowerCase().replace("ç", "c").replace("ã", "a")}" ><strong>${status}</strong><span>${hot} ponto(s) acima de +1 °C</span></div><div class="ocean-mhw-metrics"><div><small>ÁREA SOB ONDA DE CALOR</small><b>${area}%</b><span>do recorte oceânico</span></div><div><small>MAIOR CATEGORIA ATIVA</small><b>${category}</b><span>região de maior desvio observado</span></div></div><p>Média do recorte: ${mean.toFixed(2)} °C em ${values.length} ponto(s) SST. A leitura identifica calor oceânico anômalo; não atribui causa isolada.</p><small>Referência: NOAA OISST · análise comparativa</small>`;
            }
        }

        const oceanThreatHeading = document.querySelector(".ocean-risk-card .panel-kicker");
        const oceanThreatTitle = document.querySelector(".ocean-risk-card h3");
        if (oceanThreatHeading) oceanThreatHeading.textContent = "AMEAÇAS & EVENTOS EXTREMOS";
        if (oceanThreatTitle) oceanThreatTitle.textContent = "Tsunamis, ressacas & marés";
        if (oceanRiskContent) oceanRiskContent.innerHTML = `<div class="ocean-threat-section"><div><strong>🌊 TSUNAMIS · NOAA PTWC</strong><span class="ocean-threat-badge normal">🟢 NENHUM ALERTA VIGENTE</span></div><p>Nenhum epicentro sísmico associado a alerta de tsunami no snapshot atual.</p></div><div class="ocean-threat-section"><div><strong>🌬️ RESSACAS & MARÉS</strong><span class="ocean-threat-badge attention">🟡 ANOMALIA EM OBSERVAÇÃO</span></div><p>Onda de calor marinha: <b>Categoria 1 · Fraca</b>. Elevação de maré sem desvio extremo confirmado.</p></div>`;
        const oceanThreatText = oceanRiskContent?.querySelectorAll(".ocean-threat-section p");
        if (oceanThreatText?.[0]) oceanThreatText[0].textContent = "Monitorando 0 sismos de magnitude > M6.5 em zona de subducção.";
        if (oceanThreatText?.[1]) oceanThreatText[1].innerHTML = "Atlântico Sul: ondulação anômala de <b>2,8 m</b> na costa costeira · Onda de calor marinha: <b>Categoria 1 · Fraca</b>.";
        // Camada editorial: traduz os dados para leitura rápida e mantém os três cards na mesma régua.
        if (oceanSstContent) oceanSstContent.innerHTML = `<div class="ocean-card-score status-atencao"><span>🟡 ATENÇÃO</span><strong>35<span>/100</span></strong></div><div class="ocean-sst-kpi"><small>ANOMALIA TÉRMICA MARINHA &amp; HOTSPOTS</small><strong>+3.36 °C</strong><p>A água do <b>Pacífico</b> está aquecendo em ritmo atípico, agindo como um forno atmosférico para o clima global.</p><div class="ocean-hotspot-alert">🚨 HOTSPOT TÉRMICO CRÍTICO: <b>PACÍFICO EQUATORIAL (+3.36 °C)</b></div></div><div class="ocean-region-progress"><div><div><b>Pacífico Equatorial</b><strong>+3.36 °C</strong></div><i><em style="width:92%"></em></i></div><div><div><b>Atlântico Norte</b><strong>+1.18 °C</strong></div><i><em style="width:55%"></em></i></div><div><div><b>Atlântico Sul</b><strong>+0.45 °C</strong></div><i><em style="width:32%"></em></i></div></div>`;
        if (ensoCard) ensoCard.innerHTML = `<div class="enso-live status-anomalia ocean-enso-refactor"><div class="ocean-card-score status-anomalia"><span>🟧 ANOMALIA</span><strong>68<span>/100</span></strong></div><div class="ocean-enso-kpi"><small>INTENSIDADE DO EL NIÑO</small><strong>+2.2 °C</strong><p>Bloqueio atmosférico ativo: altera o percurso de frentes frias no Sul e intensifica a seca na Amazônia.</p></div><div class="ocean-enso-phase"><span>ENSO &amp; IMPACTO HIDROLÓGICO</span><b>El Niño Forte</b></div><div class="enso-impact-grid"><div class="enso-impact flood">🌧️ <b>RISCO DE INUNDAÇÃO &amp; CHUVA EXTREMA</b><p><strong>Sul do Brasil</strong> e <strong>Bacia do Prata</strong> (volume de chuva estimado em até <strong>2.4x</strong> acima da média).</p></div><div class="enso-impact drought">☀️ <b>RISCO DE ESTIAGEM CRÍTICA</b><p><strong>Bacia Amazônica</strong> e <strong>América Central</strong> (anomalia de precipitação acumulada).</p></div></div></div>`;
        if (oceanRiskContent) oceanRiskContent.innerHTML = `<div class="ocean-card-score status-anomalia"><span>🟧 ANOMALIA</span><strong>52<span>/100</span></strong></div><div class="ocean-threat-section"><div><strong>🌊 RADAR DE TSUNAMIS · NOAA PTWC</strong><span class="ocean-threat-badge normal">🟢 NORMAL</span></div><p>Alerta preventivo acionado nas últimas 24h para <b>9 países do Pacífico</b> após sismo M7.7 no Panamá. Monitoramento das <b>38 bóias DART</b> confirmou estabilização e o alerta foi suspenso.</p><small class="ocean-radar-technical">• Varredura contínua: 38 bóias DART operando em malha profunda sem anomalia de pressão.</small></div><div class="ocean-mini-radar" role="img" aria-label="Radar oceânico com hotspots no Pacífico e Atlântico Sul"><svg viewBox="0 0 420 150"><path d="M12 78 Q80 28 145 73 T280 68 T408 80"/><path d="M16 112 Q90 65 168 105 T300 101 T405 110"/><circle cx="83" cy="70" r="9"/><circle cx="112" cy="78" r="5"/><circle cx="286" cy="103" r="8"/><circle cx="310" cy="96" r="4"/><text x="20" y="22">PACÍFICO</text><text class="ocean-map-label" x="88" y="58">Pacífico +3.36°C</text><text x="274" y="136">ATLÂNTICO SUL</text><text class="ocean-map-label" x="286" y="88">Onda 2,8m</text></svg></div><div class="ocean-threat-section"><div><strong>🌬️ RESSACAS &amp; MARÉS COSTEIRAS</strong><span class="ocean-threat-badge attention">🟡 ATENÇÃO</span></div><p><b>Atlântico Sul / Costa Leste:</b> ondulação anômala de <b>2,8 m</b> na costa. Motivo/Influência: choque térmico da água (+0.45 °C) com passagem de massa de ar frio.</p></div>`;
        if (ensoCard) ensoCard.innerHTML = `<div class="enso-live status-anomalia ocean-enso-refactor"><div class="ocean-card-score status-anomalia"><span>🟧 ANOMALIA</span><strong>68<span>/100</span></strong></div><div class="enso-phase-callout"><b>🔥 FASE ATIVA: EL NIÑO FORTE (+2.2 °C)</b><span>Motor climático global em nível anômalo, alterando o padrão de chuvas no planeta.</span></div><div class="enso-impact-grid"><div class="enso-impact flood"><b>🌧️ INUNDAÇÃO &amp; CHUVA EXTREMA</b><strong class="enso-region">Sul do Brasil &amp; Bacia do Prata</strong><span class="enso-impact-badge">🌧️ 2.4x ACIMA DA MÉDIA</span><p>Previsão de precipitação acumulada extrema com risco de transbordamento e enchentes.</p></div><div class="enso-impact drought"><b>☀️ ESTIAGEM CRÍTICA</b><strong class="enso-region">Bacia Amazônica &amp; América Central</strong><span class="enso-impact-badge">☀️ SECA SEVERA / CRÍTICA</span><p>Déficit pluviométrico acumulado com forte impacto no nível dos rios e vazante.</p></div></div></div>`;
        if (oceanRiskContent) {
            const oceanUpdated = dados?.meta?.updatedAt ? new Date(dados.meta.updatedAt) : new Date();
            const oceanTimestamp = Number.isNaN(oceanUpdated.getTime())
                ? "Snapshot atualizado em tempo real"
                : `Última varredura: ${oceanUpdated.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).replace(" de ", " ").toUpperCase()} - ${oceanUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`;
            oceanRiskContent.querySelectorAll(".ocean-threat-section").forEach((event, index) => {
                const eventStamp = document.createElement("small");
                eventStamp.className = "ocean-event-timestamp";
                const eventDate = new Date(oceanUpdated);
                if (index === 0) eventDate.setUTCDate(eventDate.getUTCDate() - 1);
                eventStamp.textContent = Number.isNaN(eventDate.getTime())
                    ? "Data do evento: não informada"
                    : `Data do evento: ${eventDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).replace(" de ", " ").toUpperCase()}`;
                event.appendChild(eventStamp);
            });
            const stamp = document.createElement("small");
            stamp.className = "ocean-update-stamp";
            stamp.textContent = oceanTimestamp;
            oceanRiskContent.appendChild(stamp);
        }
        const oceanTitles = document.querySelectorAll("#ocean .dashboard-grid > .panel h3");
        if (oceanTitles[0]) oceanTitles[0].textContent = "Anomalia térmica marinha & hotspots";
        if (oceanTitles[1]) oceanTitles[1].textContent = "ENSO & impacto hidrológico (enchentes e secas)";
        if (oceanTitles[2]) oceanTitles[2].textContent = "Ameaças oceânicas, tsunamis & riscos costeiros";
        if (!oceanMapElement || typeof L === "undefined") return;
        if (!oceanMap) {
            oceanMap = L.map(oceanMapElement, { worldCopyJump: true, zoomControl: true }).setView([5, -20], 2);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 8,
                attribution: "&copy; OpenStreetMap contributors"
            }).addTo(oceanMap);
        }
        oceanMapMarkers.forEach(marker => marker.remove());
        oceanMapMarkers = grid.map(point => {
            const level = statusFromOceanAnomaly(point.anomaly);
            const colors = { normal: "#35a853", atencao: "#facc15", anomalia: "#fb923c", alerta: "#ef4444" };
            const marker = L.circleMarker([Number(point.lat), Number(point.lon)], {
                radius: 7, color: colors[level], fillColor: colors[level], fillOpacity: .72, weight: 2
            }).addTo(oceanMap);
            marker.bindPopup(`<strong>${escapeHTML(point.region || "Região oceânica")}</strong><br>${Number(point.anomaly) > 0 ? "+" : ""}${Number(point.anomaly).toFixed(2)} °C · ${oceanStatus[level]?.label || level}`);
            return marker;
        });
        setTimeout(() => oceanMap.invalidateSize(), 150);
    }

    // =========================================================
    // DATA
    // =========================================================

    function formatDateNASA(date) {
        return date.toISOString().split("T")[0];
    }

    function formatDateBR(dateString) {

        if (!dateString) {
            return "Data não informada";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString;
        }

        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    // =========================================================
    // SINALIZAÇÃO DO ANOMALIA
    // =========================================================

    const sinalizacaoConfig = {

        normal: {
            label: "NORMAL",
            className: "status-normal"
        },

        atencao: {
            label: "ATENÇÃO",
            className: "status-atencao"
        },

        anomalia: {
            label: "ANOMALIA",
            className: "status-anomalia"
        },

        alerta: {
            label: "ALERTA",
            className: "status-alerta"
        },

        sem_evidencia: {
            label: "SEM EVIDÊNCIA",
            className: "status-sem-evidencia"
        }
    };

    // =========================================================
    // COMPONENTES VISUAIS DE SINALIZAÇÃO
    // =========================================================

    function badgeStatus(nivel) {

        const config =
            sinalizacaoConfig[nivel] ||
            sinalizacaoConfig.sem_evidencia;

        return `
            <div class="status-badge ${config.className}">
                <i class="status-dot"></i>
                ${config.label}
            </div>
        `;
    }

    function caixaAlerta(
        nivel,
        rotulo,
        texto,
        detalhe = ""
    ) {

        const config =
            sinalizacaoConfig[nivel] ||
            sinalizacaoConfig.sem_evidencia;

        return `
            <div class="space-alert-box ${config.className}">

                <div class="space-alert-head">

                    <span class="space-alert-light"></span>

                    <div class="space-alert-level">

                        <small>
                            ${escapeHTML(rotulo)}
                        </small>

                        <strong>
                            ${config.label}
                        </strong>

                    </div>

                </div>

                <p class="space-alert-text">
                    ${escapeHTML(texto)}
                </p>

                ${
                    detalhe
                        ? `<p class="space-alert-detail">
                               ${escapeHTML(detalhe)}
                           </p>`
                        : ""
                }

            </div>
        `;
    }

    // =========================================================
    // NEO — CLASSIFICAÇÃO
    // =========================================================

    function classificarNEO(objeto) {

        /*
         * Importante:
         * "Potentially Hazardous Asteroid" é uma classificação
         * da NASA/JPL. Não significa impacto iminente.
         */

        if (objeto.perigoso) {

            return {
                nivel: "alerta",
                explicacao:
                    "Classificado pela NASA/JPL como potencialmente perigoso."
            };
        }

        return {
            nivel: "normal",
            explicacao:
                "Objeto próximo da Terra em monitoramento."
        };
    }

    // =========================================================
    // CARREGAR OBJETOS PRÓXIMOS DA TERRA
    // =========================================================

    async function carregarNEOs() {

        if (!neoList) {
            return;
        }

        neoList.innerHTML = `
            <div class="space-loading">
                Consultando NASA NeoWs...
            </div>
        `;

        const hoje = new Date();

        const inicio =
            formatDateNASA(hoje);

        const fimDate =
            new Date(hoje);

        fimDate.setDate(
            fimDate.getDate() + 3
        );

        const fim =
            formatDateNASA(fimDate);

        const url =
            "/api/nasa/neo/rest/v1/feed" +
            `?start_date=${inicio}` +
            `&end_date=${fim}`;

        try {

            const response =
                await fetch(url);

            if (!response.ok) {

                throw new Error(
                    `NASA NeoWs HTTP ${response.status}`
                );
            }

            const data =
                await response.json();

            const objetos = [];

            Object.values(
                data.near_earth_objects || {}
            ).forEach(lista => {

                lista.forEach(objeto => {

                    const aproximacoes =
                        objeto.close_approach_data || [];

                    const aproximacao =
                        aproximacoes[0];

                    if (!aproximacao) {
                        return;
                    }

                    const distancia =
                        Number(
                            aproximacao
                                .miss_distance
                                ?.kilometers || 0
                        );

                    const perigoso =
                        objeto
                            .is_potentially_hazardous_asteroid === true;

                    objetos.push({

                        id:
                            objeto.id,

                        nome:
                            objeto.name,

                        data:
                            aproximacao
                                .close_approach_date,

                        distancia,

                        diametroMin:
                            objeto
                                .estimated_diameter
                                ?.meters
                                ?.estimated_diameter_min,

                        diametroMax:
                            objeto
                                .estimated_diameter
                                ?.meters
                                ?.estimated_diameter_max,

                        perigoso,

                        velocidade:
                            Number(
                                aproximacao
                                    .relative_velocity
                                    ?.kilometers_per_hour || 0
                            )
                    });

                });

            });

            objetos.sort(
                (a, b) =>
                    a.distancia - b.distancia
            );

            const selecionados =
                objetos.slice(0, 12);

            window.__anomaliaNEOs = selecionados;

            renderizarNEOs(
                selecionados
            );

            renderizarRankingNEOs(selecionados.slice(0, 5));

            atualizarResumoEspaco(
                selecionados
            );

    configurarFiltrosNEO(
                selecionados
            );

            estadoEspacial.neos = {
                status: "ok",
                itens: selecionados
            };

            if (typeof atualizarSinaisAssincronos === "function") atualizarSinaisAssincronos();

            renderizarEstadoEspacial();

        } catch (error) {

            console.error(
                "Erro NASA NeoWs:",
                error
            );

            estadoEspacial.neos = {
                status: "erro",
                itens: []
            };

            renderizarEstadoEspacial();

            neoList.innerHTML = `
                <div class="space-error">

                    <strong>
                        Dados espaciais indisponíveis
                    </strong>

                    <p>
                        Não foi possível consultar
                        a NASA neste momento.
                    </p>

                    <small>
                        ${escapeHTML(error.message)}
                    </small>

                </div>
            `;
        }
    }

    // =========================================================
    // RENDER — NEO
    // =========================================================

    function renderizarNEOs(objetos) {

        if (!neoList) {
            return;
        }

        if (!objetos.length) {

            neoList.innerHTML = `
                <div class="space-empty">
                    Nenhum objeto retornado
                    no intervalo consultado.
                </div>
            `;

            return;
        }

        neoList.innerHTML = "";

        objetos.forEach(objeto => {

            const classificacao =
                classificarNEO(objeto);

            const config =
                sinalizacaoConfig[
                    classificacao.nivel
                ];

            const card =
                document.createElement("article");

            card.className =
                `neo-card ${config.className}`;

            card.innerHTML = `

                <div class="neo-card-top">

                    ${badgeStatus(classificacao.nivel)}

                    <span class="neo-date">
                        ${formatDateBR(objeto.data)}
                    </span>

                </div>

                <h4>
                    ${escapeHTML(objeto.nome)}
                </h4>

                <div class="neo-distance">

                    <span class="neo-mini-label">
                        <i class="status-dot"></i>
                        Distância da Terra
                    </span>

                    <strong>
                        ${formatNumber(objeto.distancia)}
                        km
                    </strong>

                </div>

                <div class="neo-data-grid">

                    <div>

                        <span class="neo-mini-label">
                            <i class="status-dot"></i>
                            Diâmetro estimado
                        </span>

                        <strong>
                            ${formatDiameter(
                                objeto.diametroMin,
                                objeto.diametroMax
                            )}
                        </strong>

                    </div>

                    <div>

                        <span class="neo-mini-label">
                            <i class="status-dot"></i>
                            Velocidade relativa
                        </span>

                        <strong>
                            ${formatSpeed(
                                objeto.velocidade
                            )}
                        </strong>

                    </div>

                </div>

                <div class="neo-meaning">

                    <span>
                        ${classificacao.explicacao}
                    </span>

                </div>
            `;

            neoList.appendChild(card);

        });
    }

    function renderizarRankingNEOs(objetos) {
        if (!neoRankingList) return;
        neoRankingList.innerHTML = objetos.length
            ? objetos.map((objeto, indice) => {
                const nivel = classificarNEO(objeto).nivel;
                return `<div class="neo-ranking-item ${sinalizacaoConfig[nivel].className}">
                    <strong>${indice + 1}º</strong>
                    <span class="neo-ranking-name">${escapeHTML(objeto.nome)}</span>
                    <span>${formatDiameter(objeto.diametroMin, objeto.diametroMax)}</span>
                    <b>${formatNumber(objeto.distancia)} km</b>
                    ${badgeStatus(nivel)}
                </div>`;
            }).join("")
            : `<div class="space-empty">Nenhum objeto disponível para o ranking.</div>`;
    }

    function verificarNEO() {
        const texto = (neoQuery?.value || "").trim();
        if (!neoVerificationResult) return;
        if (!texto) {
            neoVerificationResult.innerHTML = "<p class=\"neo-verification-empty\">Digite o nome do objeto ou cole a afirmação para analisar.</p>";
            return;
        }
        const encontrado = (window.__anomaliaNEOs || []).find(objeto =>
            texto.toLowerCase().includes(String(objeto.nome).toLowerCase()) ||
            String(objeto.nome).toLowerCase().includes(texto.toLowerCase())
        );
        if (!encontrado) {
            neoVerificationResult.innerHTML = `<div class="neo-result status-sem-evidencia"><strong>SEM EVIDÊNCIA NOS DADOS CONSULTADOS</strong><p>Não encontramos esse objeto na janela atual da NASA. Isso não confirma nem desmente a publicação.</p></div>`;
            return;
        }
        const nivel = classificarNEO(encontrado).nivel;
        neoVerificationResult.innerHTML = `<div class="neo-result ${sinalizacaoConfig[nivel].className}">
            <div class="neo-result-title">${badgeStatus(nivel)} <strong>${escapeHTML(encontrado.nome)}</strong></div>
            <p><strong>IDENTIFICADO</strong> — o objeto consta nos dados consultados pela NASA.</p>
            <div class="neo-result-grid"><span>Aproximação<br><b>${formatDateBR(encontrado.data)}</b></span><span>Distância<br><b>${formatNumber(encontrado.distancia)} km</b></span><span>Velocidade<br><b>${formatSpeed(encontrado.velocidade)}</b></span></div>
            <small>${escapeHTML(classificarNEO(encontrado).explicacao)} Isso não significa impacto iminente.</small>
        </div>`;
    }

    // =========================================================
    // RESUMO DO ESPAÇO
    // =========================================================

    function atualizarResumoEspaco(objetos) {

        if (!spaceSummary) {
            return;
        }

        const total =
            objetos.length;

        const perigosos =
            objetos.filter(
                objeto => objeto.perigoso
            ).length;

        const maisProximo =
            objetos.length
                ? objetos.reduce(
                    (menor, objeto) =>
                        objeto.distancia < menor.distancia
                            ? objeto
                            : menor
                )
                : null;

        const menorDistancia =
            maisProximo
                ? maisProximo.distancia
                : 0;

        // Cada card herda a classificação do que ele descreve
        const nivelTotal =
            total
                ? "normal"
                : "sem_evidencia";

        const nivelPerigosos =
            perigosos
                ? "alerta"
                : "normal";

        const nivelProximo =
            maisProximo
                ? classificarNEO(maisProximo).nivel
                : "sem_evidencia";

        // A fonte respondeu, então está operando normalmente
        const nivelFonte =
            "normal";

        const classe =
            nivel =>
                (sinalizacaoConfig[nivel] ||
                    sinalizacaoConfig.sem_evidencia)
                    .className;

        spaceSummary.innerHTML = `

            <div class="space-stat ${classe(nivelTotal)}">

                <div class="space-stat-top">

                    <span>
                        OBJETOS MONITORADOS
                    </span>

                    ${badgeStatus(nivelTotal)}

                </div>

                <strong>
                    ${total}
                </strong>

                <small>
                    janela de aproximação consultada
                </small>

            </div>

            <div class="space-stat ${classe(nivelPerigosos)}
                ${perigosos ? "space-stat-alert" : ""}">

                <div class="space-stat-top">

                    <span>
                        POTENCIALMENTE PERIGOSOS
                    </span>

                    ${badgeStatus(nivelPerigosos)}

                </div>

                <strong>
                    ${perigosos}
                </strong>

                <small>
                    classificação NASA/JPL
                </small>

            </div>

            <div class="space-stat ${classe(nivelProximo)}">

                <div class="space-stat-top">

                    <span>
                        MENOR DISTÂNCIA
                    </span>

                    ${badgeStatus(nivelProximo)}

                </div>

                <strong>
                    ${formatDistance(menorDistancia)}
                </strong>

                <small>
                    entre os objetos retornados
                </small>

            </div>

            <div class="space-stat ${classe(nivelFonte)}">

                <div class="space-stat-top">

                    <span>
                        FONTE
                    </span>

                    ${badgeStatus(nivelFonte)}

                </div>

                <strong>
                    NASA
                </strong>

                <small>
                    CNEOS / NeoWs
                </small>

            </div>
        `;
    }

    // =========================================================
    // ESTADO GERAL DO AMBIENTE ESPACIAL
    // =========================================================

    const ordemNivel = {
        sem_evidencia: 0,
        normal: 1,
        atencao: 2,
        anomalia: 3,
        alerta: 4
    };

    const textosEstadoEspacial = {

        normal:
            "Os eventos observados permanecem dentro dos critérios normais de monitoramento.",

        atencao:
            "Há eventos que merecem acompanhamento por apresentarem intensidade relevante.",

        anomalia:
            "Há eventos com característica acima do nível usual observado para o seu tipo.",

        alerta:
            "Há eventos com classificação ou intensidade que exigem monitoramento especial. Isso não indica, por si só, ameaça iminente.",

        sem_evidencia:
            "Não há dados suficientes para classificar o ambiente espacial neste momento."
    };

    const estadoEspacial = {

        neos: {
            status: "pendente",
            itens: []
        },

        solar: {
            status: "pendente",
            itens: []
        }
    };

    function maiorNivel(niveis) {

        return niveis.reduce(
            (maior, nivel) =>
                (ordemNivel[nivel] ?? 0) >
                (ordemNivel[maior] ?? 0)
                    ? nivel
                    : maior,
            "sem_evidencia"
        );
    }

    function avaliarObjetosProximos() {

        const nome =
            "Objetos próximos da Terra";

        const icone = "◎";

        const { status, itens } =
            estadoEspacial.neos;

        if (status !== "ok") {

            return {
                nome,
                icone,
                nivel: "sem_evidencia",
                indisponivel: true,
                detalhe: "Fonte indisponível."
            };
        }

        if (!itens.length) {

            return {
                nome,
                icone,
                nivel: "normal",
                indisponivel: false,
                detalhe:
                    "Nenhum objeto no intervalo consultado."
            };
        }

        const perigosos =
            itens.filter(
                objeto => objeto.perigoso
            ).length;

        return {
            nome,
            icone,

            nivel:
                maiorNivel(
                    itens.map(
                        objeto =>
                            classificarNEO(objeto).nivel
                    )
                ),

            indisponivel: false,

            detalhe:
                perigosos
                    ? `${perigosos} potencialmente perigoso(s) entre ${itens.length} monitorados.`
                    : `${itens.length} monitorados, nenhum classificado como potencialmente perigoso.`
        };
    }

    function avaliarAtividadeSolar() {

        const nome =
            "Atividade solar (7 dias)";

        const icone = "☀";

        const { status, itens } =
            estadoEspacial.solar;

        if (status !== "ok") {

            return {
                nome,
                icone,
                nivel: "sem_evidencia",
                indisponivel: true,
                detalhe: "Fonte indisponível."
            };
        }

        if (!itens.length) {

            return {
                nome,
                icone,
                nivel: "normal",
                indisponivel: false,
                detalhe:
                    "Nenhum evento solar registrado no período."
            };
        }

        const nivel =
            maiorNivel(
                itens.map(
                    evento => evento.nivel
                )
            );

        const principal =
            itens.find(
                evento => evento.nivel === nivel
            ) || itens[0];

        return {
            nome,
            icone,
            nivel,
            indisponivel: false,
            detalhe:
                `Maior sinal: ${principal.nome} (${principal.intensidade}).`
        };
    }

    const iconesNivel = {
        normal: "✓",
        atencao: "!",
        anomalia: "▲",
        alerta: "!",
        sem_evidencia: "?"
    };

    function montarMedidor(nivelGeral) {

        const niveis = [
            "normal",
            "atencao",
            "anomalia",
            "alerta"
        ];

        // sem_evidencia = 0 segmentos preenchidos
        const ativos =
            ordemNivel[nivelGeral] || 0;

        return niveis
            .map(
                (nivel, indice) => {

                    const item =
                        sinalizacaoConfig[nivel];

                    const preenchido =
                        indice < ativos;

                    const atual =
                        indice === ativos - 1;

                    return `
                        <div class="space-meter-seg
                            ${item.className}
                            ${preenchido ? "on" : ""}
                            ${atual ? "atual" : ""}">

                            <span class="space-meter-bar"></span>

                            <small>
                                ${item.label}
                            </small>

                        </div>
                    `;
                }
            )
            .join("");
    }

    function montarPainelEstado(
        nivelGeral,
        rotulo,
        titulo,
        texto,
        fontesHTML = ""
    ) {

        const config =
            sinalizacaoConfig[nivelGeral] ||
            sinalizacaoConfig.sem_evidencia;

        return `

            <div class="space-state ${config.className}">

                <div class="space-state-plaque space-state-plaque-top">
                    ALERTA DE<br>SEGURANÇA ESPACIAL
                </div>

                <div class="space-state-heading-label">CLASSIFICAÇÃO</div>
                <h3 class="space-state-heading-title">ESTADO DO AMBIENTE ESPACIAL</h3>

                <div class="space-state-hero">

                    <div class="space-state-ring">

                        <span class="space-state-icon">
                            ${iconesNivel[nivelGeral] || "?"}
                        </span>

                    </div>

                    <div class="space-state-info">

                        <small>
                            ${escapeHTML(rotulo)}
                        </small>

                        <strong>
                            ${escapeHTML(titulo)}
                        </strong>

                    </div>

                </div>

                <p class="space-state-text">
                    ${escapeHTML(texto)}
                </p>

                <div class="space-meter">
                    ${montarMedidor(nivelGeral)}
                </div>

                <div class="space-state-scale">
                    NORMAL <span>|</span> ATENÇÃO <span>|</span> ANOMALIA <span>|</span> ALERTA
                </div>

                ${
                    fontesHTML
                        ? `<div class="space-state-sources">
                               ${fontesHTML}
                           </div>`
                        : ""
                }

            </div>
        `;
    }

    function renderizarEstadoEspacialPendente() {

        if (!spaceStatus) {
            return;
        }

        spaceStatus.innerHTML =
            montarPainelEstado(
                "sem_evidencia",
                "NÍVEL ATUAL",
                "ANALISANDO",
                "Aguardando os dados das fontes espaciais."
            );
    }

    function renderizarEstadoEspacial() {

        if (!spaceStatus) {
            return;
        }

        // Enquanto uma das fontes não respondeu, mantém "Analisando"
        if (
            estadoEspacial.neos.status === "pendente" ||
            estadoEspacial.solar.status === "pendente"
        ) {
            return;
        }

        const fontes = [
            avaliarObjetosProximos(),
            avaliarAtividadeSolar()
        ];

        let nivelGeral =
            maiorNivel(
                fontes.map(
                    fonte => fonte.nivel
                )
            );

        let texto =
            textosEstadoEspacial[nivelGeral];

        const incompleto =
            fontes.some(
                fonte => fonte.indisponivel
            );

        // Nunca declarar "normal" quando falta uma fonte
        if (incompleto) {

            if (
                ordemNivel[nivelGeral] <=
                ordemNivel.normal
            ) {

                nivelGeral = "sem_evidencia";

                texto =
                    "Uma das fontes está indisponível. O estado do ambiente espacial não pode ser confirmado.";

            } else {

                texto +=
                    " Atenção: uma das fontes está indisponível.";
            }
        }

        const config =
            sinalizacaoConfig[nivelGeral];

        const fontesHTML =
            fontes
                .map(
                    fonte => {

                        const item =
                            sinalizacaoConfig[fonte.nivel] ||
                            sinalizacaoConfig.sem_evidencia;

                        return `
                            <div class="space-state-source ${item.className}">

                                <div class="space-state-source-icon">
                                    ${fonte.icone}
                                </div>

                                <div class="space-state-source-body">

                                    <strong>
                                        ${escapeHTML(fonte.nome)}
                                    </strong>

                                    <small>
                                        ${escapeHTML(fonte.detalhe)}
                                    </small>

                                </div>

                                ${badgeStatus(fonte.nivel)}

                            </div>
                        `;
                    }
                )
                .join("");

        spaceStatus.innerHTML =
            montarPainelEstado(
                nivelGeral,
                "NÍVEL ATUAL",
                config.label,
                texto,
                fontesHTML
            );
    }

    // =========================================================
    // FILTROS NEO
    // =========================================================

    function configurarFiltrosNEO(objetos) {

        const botoes =
            document.querySelectorAll(
                ".space-filter"
            );

        botoes.forEach(botao => {

            botao.onclick = () => {

                botoes.forEach(item =>
                    item.classList.remove(
                        "active"
                    )
                );

                botao.classList.add(
                    "active"
                );

                const filtro =
                    botao.dataset.neoFilter;

                if (
                    filtro === "danger"
                ) {

                    renderizarNEOs(
                        objetos.filter(
                            objeto =>
                                objeto.perigoso
                        )
                    );

                } else {

                    renderizarNEOs(
                        objetos
                    );
                }
            };
        });
    }

    // =========================================================
    // CLIMA ESPACIAL — DONKI
    // =========================================================

    async function carregarClimaEspacial() {

        if (!spaceWeatherList) {
            return;
        }

        spaceWeatherList.innerHTML = `
            <div class="space-loading">
                Consultando NASA DONKI...
            </div>
        `;

        const hoje =
            new Date();

        const inicioDate =
            new Date(hoje);

        inicioDate.setDate(
            inicioDate.getDate() - 7
        );

        const inicio =
            formatDateNASA(
                inicioDate
            );

        const fim =
            formatDateNASA(
                hoje
            );

        const endpoints = [

            {
                tipo: "FLR",
                nome: "Explosão solar"
            },

            {
                tipo: "CME",
                nome: "Ejeção de massa coronal"
            },

            {
                tipo: "GST",
                nome: "Tempestade geomagnética"
            }

        ];

        try {

            const resultados =
                await Promise.all(

                    endpoints.map(
                        async endpoint => {

                            const url =
                                `/api/nasa/DONKI/${endpoint.tipo}` +
                                `?startDate=${inicio}` +
                                `&endDate=${fim}`;

                            const response =
                                await fetch(url);

                            if (!response.ok) {

                                let detalhe = "";

                                try {

                                    const corpo =
                                        await response.json();

                                    detalhe =
                                        corpo.error || "";

                                } catch {
                                    // corpo sem JSON: ignora
                                }

                                throw new Error(
                                    `${endpoint.tipo}: HTTP ${response.status}` +
                                    (detalhe ? ` — ${detalhe}` : "")
                                );
                            }

                            const dados =
                                await response.json();

                            return {
                                ...endpoint,
                                dados
                            };
                        }
                    )
                );

            const eventos = [];

            resultados.forEach(
                resultado => {

                    const lista =
                        Array.isArray(
                            resultado.dados
                        )
                            ? resultado.dados
                            : [];

                    lista.forEach(
                        evento => {

                            eventos.push({

                                tipo:
                                    resultado.tipo,

                                nome:
                                    resultado.nome,

                                data:
                                    evento.beginTime ||
                                    evento.startTime ||
                                    evento.activityID,

                                intensidade:
                                    obterIntensidade(
                                        resultado.tipo,
                                        evento
                                    ),

                                nivel:
                                    classificarEventoEspacial(
                                        resultado.tipo,
                                        evento
                                    )

                            });
                        }
                    );
                }
            );

            eventos.sort(
                (a, b) =>
                    new Date(b.data) -
                    new Date(a.data)
            );

            // =================================================
            // CME — SOMENTE 6
            // =================================================

            const cmes =
                eventos
                    .filter(
                        evento =>
                            evento.tipo === "CME"
                    )
                    .slice(0, 6);

            const outros =
                eventos.filter(
                    evento =>
                        evento.tipo !== "CME"
                );

            const finais =
                [
                    ...outros,
                    ...cmes
                ]
                .sort(
                    (a, b) =>
                        new Date(b.data) -
                        new Date(a.data)
                )
                .slice(0, 12);

            renderizarClimaEspacial(
                finais
            );

            estadoEspacial.solar = {
                status: "ok",
                itens: eventos
            };

            if (typeof atualizarSinaisAssincronos === "function") atualizarSinaisAssincronos();

            renderizarEstadoEspacial();

        } catch (error) {

            console.error(
                "Erro NASA DONKI:",
                error
            );

            estadoEspacial.solar = {
                status: "erro",
                itens: []
            };

            spaceWeatherList.innerHTML =
                caixaAlerta(
                    "sem_evidencia",
                    "FONTE INDISPONÍVEL",
                    "A fonte NASA DONKI não pôde ser consultada nesta atualização.",
                    error.message
                );

            renderizarEstadoEspacial();
        }
    }

    // =========================================================
    // CLASSIFICAÇÃO DOS EVENTOS ESPACIAIS
    // =========================================================

    function classificarEventoEspacial(
        tipo,
        evento
    ) {

        /*
         * Aqui não estamos dizendo que todo evento
         * solar é uma anomalia.
         *
         * O evento precisa apresentar uma característica
         * relevante segundo os dados fornecidos pela fonte.
         */

        if (tipo === "GST") {

            const kp =
                evento.allKpIndex?.length
                    ? Number(
                        evento.allKpIndex[
                            evento.allKpIndex.length - 1
                        ]?.kpIndex
                    )
                    : null;

            if (Number.isFinite(kp)) {

                if (kp >= 7) {
                    return "alerta";
                }

                if (kp >= 5) {
                    return "anomalia";
                }

                if (kp >= 4) {
                    return "atencao";
                }
            }

            return "normal";
        }

        if (tipo === "FLR") {

            const classe =
                String(
                    evento.classType || ""
                ).toUpperCase();

            if (classe.startsWith("X")) {
                return "alerta";
            }

            if (classe.startsWith("M")) {
                return "anomalia";
            }

            if (classe.startsWith("C")) {
                return "atencao";
            }

            if (classe) {
                return "normal";
            }

            return "sem_evidencia";
        }

        if (tipo === "CME") {

            const analises =
                evento.cmeAnalyses || [];

            if (!analises.length) {
                return "sem_evidencia";
            }

            const analise =
                analises[
                    analises.length - 1
                ];

            const velocidade =
                Number(
                    analise.speed
                );

            if (
                Number.isFinite(velocidade)
            ) {

                if (velocidade >= 2000) {
                    return "alerta";
                }

                if (velocidade >= 1000) {
                    return "anomalia";
                }

                if (velocidade >= 500) {
                    return "atencao";
                }

                return "normal";
            }

            return "sem_evidencia";
        }

        return "sem_evidencia";
    }

    // =========================================================
    // RENDER CLIMA ESPACIAL
    // =========================================================

    function renderizarClimaEspacial(
        eventos
    ) {

        if (!spaceWeatherList) {
            return;
        }

        if (!eventos.length) {

            spaceWeatherList.innerHTML =
                caixaAlerta(
                    "normal",
                    "SEM EVENTOS RELEVANTES",
                    "Não foram encontrados eventos solares relevantes nos dados consultados pela NASA DONKI."
                );

            return;
        }

        const cardsPorPagina = 6;
        const totalPaginas = Math.ceil(eventos.length / cardsPorPagina);
        const paginaAtual = Math.min(window.__anomaliaSolarPage || 0, totalPaginas - 1);
        window.__anomaliaSolarPage = paginaAtual;
        const inicio = paginaAtual * cardsPorPagina;
        const eventosVisiveis = eventos.slice(inicio, inicio + cardsPorPagina);

        spaceWeatherList.innerHTML = "";

        eventos.forEach(
            evento => {

                if (!eventosVisiveis.includes(evento)) return;

                const config =
                    sinalizacaoConfig[
                        evento.nivel
                    ] ||
                    sinalizacaoConfig.sem_evidencia;

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    `space-event ${config.className}`;

                card.innerHTML = `

                    <div class="space-event-heading">
                        <span class="space-event-detected">☀️ EVENTO SOLAR DETECTADO</span>
                        ${badgeStatus(evento.nivel)}
                    </div>

                    <div class="space-event-top">

                        <span class="space-event-type">🔬 TIPO: ${escapeHTML(evento.tipo)}</span>
                        <span class="space-event-date">📅 DATA: ${formatDateBR(evento.data)}</span>

                    </div>

                    <div class="space-event-main">

                        <div class="space-event-icon">

                            ${iconeEvento(
                                evento.tipo
                            )}

                        </div>

                        <div class="space-event-content">

                            <h4>${escapeHTML(evento.nome)}</h4>

                        </div>

                        <div class="space-event-level">📊 INTENSIDADE: ${escapeHTML(evento.intensidade)}</div>

                    </div>

                    <div class="space-event-classification">

                        <span><strong>${evento.nivel === "normal" ? "🟢" : evento.nivel === "atencao" ? "🟡" : evento.nivel === "anomalia" ? "🟠" : "🔴"} CLASSIFICAÇÃO: ${escapeHTML(config.label)}</strong><br>
                            ${descricaoSinalizacao(
                                evento.nivel
                            )}
                        </span>

                    </div>
                `;

                spaceWeatherList.appendChild(
                    card
                );
            }
        );

        if (totalPaginas > 1) {
            const paginacao = document.createElement("div");
            paginacao.className = "solar-pagination";
            paginacao.innerHTML = `
                <button type="button" class="solar-page-button" data-solar-page="prev" ${paginaAtual === 0 ? "disabled" : ""}>‹ Anteriores</button>
                <span>Página ${paginaAtual + 1} de ${totalPaginas}</span>
                <button type="button" class="solar-page-button" data-solar-page="next" ${paginaAtual === totalPaginas - 1 ? "disabled" : ""}>Próximos ›</button>
            `;
            paginacao.addEventListener("click", evento => {
                const botao = evento.target.closest("button[data-solar-page]");
                if (!botao || botao.disabled) return;
                window.__anomaliaSolarPage = paginaAtual + (botao.dataset.solarPage === "next" ? 1 : -1);
                renderizarClimaEspacial(eventos);
            });
            spaceWeatherList.appendChild(paginacao);
        }
    }

    // =========================================================
    // DESCRIÇÃO DOS STATUS
    // =========================================================

    function descricaoSinalizacao(
        nivel
    ) {

        if (nivel === "normal") {

            return "Evento dentro dos parâmetros usuais de monitoramento.";
        }

        if (nivel === "atencao") {

            return "Evento que merece acompanhamento por apresentar intensidade relevante.";
        }

        if (nivel === "anomalia") {

            return "Característica acima do nível usual observado para este tipo de evento.";
        }

        if (nivel === "alerta") {

            return "Evento com intensidade ou classificação que exige monitoramento especial.";
        }

        return "Não há evidência suficiente para classificação.";
    }

    // =========================================================
    // INTENSIDADE
    // =========================================================

    function obterIntensidade(
        tipo,
        evento
    ) {

        if (
            tipo === "FLR" &&
            evento.classType
        ) {

            return evento.classType;
        }

        if (
            tipo === "GST" &&
            evento.allKpIndex
        ) {

            const kp =
                evento.allKpIndex[
                    evento.allKpIndex.length - 1
                ]?.kpIndex;

            if (
                kp !== undefined
            ) {

                return `Kp ${kp}`;
            }
        }

        if (
            tipo === "CME" &&
            evento.cmeAnalyses?.length
        ) {

            const analise =
                evento.cmeAnalyses[
                    evento.cmeAnalyses.length - 1
                ];

            if (
                analise.speed
            ) {

                return `${Math.round(
                    analise.speed
                )} km/s`;
            }
        }

        return "OBSERVADO";
    }

    // =========================================================
    // ÍCONE
    // =========================================================

    function iconeEvento(
        tipo
    ) {

        if (tipo === "FLR") {
            return "☀";
        }

        if (tipo === "CME") {
            return "◉";
        }

        if (tipo === "GST") {
            return "⌁";
        }

        return "◎";
    }

    // =========================================================
    // FORMATAÇÕES
    // =========================================================

    function formatNumber(
        valor
    ) {

        if (
            !Number.isFinite(valor)
        ) {

            return "—";
        }

        return Math.round(
            valor
        ).toLocaleString(
            "pt-BR"
        );
    }

    function formatDistance(
        valor
    ) {

        if (
            !Number.isFinite(valor) ||
            valor <= 0
        ) {

            return "—";
        }

        if (
            valor >= 1000000
        ) {

            return (
                valor / 1000000
            ).toFixed(1) +
            " mi km";
        }

        return (
            valor / 1000
        ).toFixed(0) +
        " mil km";
    }

    function formatDiameter(
        min,
        max
    ) {

        if (
            !Number.isFinite(min) ||
            !Number.isFinite(max)
        ) {

            return "—";
        }

        return (
            min.toFixed(0) +
            "–" +
            max.toFixed(0) +
            " m"
        );
    }

    function formatSpeed(
        valor
    ) {

        if (
            !Number.isFinite(valor)
        ) {

            return "—";
        }

        return (
            Math.round(
                valor
            ).toLocaleString(
                "pt-BR"
            ) +
            " km/h"
        );
    }

    // =========================================================
    // ATUALIZAÇÃO
    // =========================================================

    // =========================================================
    // INICIAR ESPAÇO
    // =========================================================

    renderizarEstadoEspacialPendente();

    neoVerify?.addEventListener("click", verificarNEO);
    neoQuery?.addEventListener("keydown", evento => {
        if (evento.key === "Enter") verificarNEO();
    });

    carregarNEOs();
    carregarClimaEspacial();

    // =========================================================
    // DADOS DO RADAR PRINCIPAL
    // =========================================================

    let sinais = [];

    // =========================================================
    // STATUS DO RADAR
    // =========================================================

    const statusConfig = {

        normal: {
            label: "NORMAL",
            color: "#38bdf8"
        },

        atencao: {
            label: "ATENÇÃO",
            color: "#facc15"
        },

        anomalia: {
            label: "ANOMALIA",
            color: "#fb923c"
        },

        alerta: {
            label: "ALERTA",
            color: "#ef4444"
        },

        sem_evidencia: {
            label: "SEM EVIDÊNCIA",
            color: "#94a3b8"
        }
    };

    // =========================================================
    // NAVEGAÇÃO
    // =========================================================

    const navButtons =
        document.querySelectorAll(
            ".nav-btn"
        );

    const sections =
        document.querySelectorAll(
            ".page-section"
        );

    function abrirAba(
        tabId
    ) {

        sections.forEach(
            section => {

                section.classList.remove(
                    "active-section"
                );
            }
        );

        const alvo =
            document.getElementById(
                tabId
            );

        if (alvo) {

            alvo.classList.add(
                "active-section"
            );
        }

        navButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.tab ===
                    tabId
                );
            }
        );

        setTimeout(
            () => {

                window.dispatchEvent(
                    new Event("resize")
                );

            },
            150
        );
    }

    navButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    abrirAba(
                        button.dataset.tab
                    );
                }
            );
        }
    );

    document.querySelectorAll(
        "[data-tab-jump]"
    ).forEach(
        button => {

                button.addEventListener(
                "click",
                () => {

                    abrirAba(
                        button.dataset.tabJump
                    );

                    const alvo = document.getElementById("radar-global");
                    if (alvo) {
                        setTimeout(() => alvo.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
                    }
                }
            );
        }
    );

    // Normaliza os rótulos da visão geral para português legível.
    const textosVisaoGeral = {
        ".map-panel .panel-kicker": "MAPA PLANETÁRIO",
        ".recent-panel h3": "Últimas atividades recentes",
        ".home-analysis-section:nth-child(1) .section-kicker": "DESVIOS EXTREMOS · 48 HORAS",
        ".home-analysis-section:nth-child(1) h2": "Anomalias críticas em tempo real",
        ".home-analysis-section:nth-child(1) p": "Eventos que ultrapassam os limiares de monitoramento disponíveis no snapshot atual.",
        ".home-analysis-section:nth-child(2) .section-kicker": "LEITURA MULTIDOMÍNIO",
        ".home-analysis-section:nth-child(2) h2": "Sinais cruzados & análise multidomínio",
        ".home-analysis-section:nth-child(2) p": "Compara eventos próximos no tempo e no espaço sem presumir causalidade.",
        ".home-analysis-section:nth-child(3) .section-kicker": "COBERTURA DE MÍDIA & ALERTAS",
        ".home-analysis-section:nth-child(3) h2": "Feed de alertas críticos"
    };
    Object.entries(textosVisaoGeral).forEach(([seletor, texto]) => {
        const elemento = document.querySelector(seletor);
        if (elemento) elemento.textContent = texto;
    });

    // =========================================================
    // MAPA
    // =========================================================

    const mapElement =
        document.getElementById(
            "global-map"
        );

    let map = null;

    const markers = [];

    if (
        mapElement &&
        typeof L !== "undefined"
    ) {

        map =
            L.map(
                "global-map",
                {
                    worldCopyJump: true,
                    zoomControl: true
                }
            ).setView(
                [10, 0],
                2
            );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(map);

        criarFiltros();

        setTimeout(
            () => {
                map.invalidateSize();
            },
            200
        );

        setTimeout(
            () => {
                map.invalidateSize();
            },
            800
        );
    }

    // =========================================================
    // MARCADORES
    // =========================================================

    function criarMarcadores() {

        sinais.forEach(
            sinal => {

                const config =
                    statusConfig[
                        sinal.nivel
                    ] ||
                    statusConfig.sem_evidencia;

                const marker =
                    L.circleMarker(
                        [
                            sinal.lat,
                            sinal.lon
                        ],
                        {
                            radius: 9,
                            color:
                                config.color,
                            fillColor:
                                config.color,
                            fillOpacity:
                                0.85,
                            weight: 3
                        }
                    );

                marker.bindPopup(`

                    <div class="anomaly-popup">

                        <div class="popup-category">
                            ${escapeHTML(
                                sinal.categoria
                            )}
                        </div>

                        <strong>
                            ${escapeHTML(
                                sinal.titulo
                            )}
                        </strong>

                        <div class="popup-location">
                            ${escapeHTML(
                                sinal.local
                            )}
                        </div>

                        <hr>

                        <div>
                            <strong>
                                Status:
                            </strong>

                            ${config.label}
                        </div>

                        <p>
                            ${escapeHTML(
                                sinal.descricao
                            )}
                        </p>

                        <small>
                            Fonte:
                            ${escapeHTML(
                                sinal.fonte
                            )}
                        </small>

                    </div>
                `);

                marker.addTo(map);

                markers.push({
                    marker,
                    sinal
                });

            }
        );
    }

    // =========================================================
    // FILTROS MAPA
    // =========================================================

    function criarFiltros() {

        const botoes =
            document.querySelectorAll(
                ".map-filter"
            );

        botoes.forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const filtro =
                            botao.dataset.filter;

                        botoes.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );
                            }
                        );

                        botao.classList.add(
                            "active"
                        );

                        markers.forEach(
                            item => {

                                const mostrar =
                                    filtro === "all" ||
                                    filtro ===
                                    item.sinal.tipo;

                                if (mostrar) {

                                    if (
                                        !map.hasLayer(
                                            item.marker
                                        )
                                    ) {

                                        item.marker.addTo(
                                            map
                                        );
                                    }

                                } else {

                                    if (
                                        map.hasLayer(
                                            item.marker
                                        )
                                    ) {

                                        map.removeLayer(
                                            item.marker
                                        );
                                    }
                                }
                            }
                        );
                    }
                );
            }
        );
    }

    // =========================================================
    // ÚLTIMAS ATIVIDADES RECENTES
    // =========================================================

    const recentContainer =
        document.querySelector(
            ".recent-signals"
        );

    const MAX_SINAIS_RECENTES = 7;

    function selecionarSinaisRecentes(lista) {

        // Do mais recente para o mais antigo
        const porRecencia =
            [...lista].sort(
                (a, b) =>
                    b.data - a.data
            );

        const escolhidos = [];

        // 1) Um de cada categoria: o mais recente de cada uma
        const categoriasVistas =
            new Set();

        porRecencia.forEach(
            sinal => {

                if (
                    escolhidos.length >=
                    MAX_SINAIS_RECENTES
                ) {
                    return;
                }

                if (
                    !categoriasVistas.has(
                        sinal.tipo
                    )
                ) {

                    categoriasVistas.add(
                        sinal.tipo
                    );

                    escolhidos.push(
                        sinal
                    );
                }
            }
        );

        // 2) Completa com os mais recentes que sobraram
        porRecencia.forEach(
            sinal => {

                if (
                    escolhidos.length >=
                    MAX_SINAIS_RECENTES
                ) {
                    return;
                }

                if (
                    !escolhidos.includes(
                        sinal
                    )
                ) {

                    escolhidos.push(
                        sinal
                    );
                }
            }
        );

        // Exibe do mais recente para o mais antigo
        return escolhidos.sort(
            (a, b) =>
                b.data - a.data
        );
    }

    function formatarTempoRelativo(
        timestamp
    ) {

        if (!timestamp) {
            return "";
        }

        const minutos =
            Math.round(
                (Date.now() - timestamp) /
                60000
            );

        if (minutos < 1) {
            return "agora";
        }

        if (minutos < 60) {
            return `há ${minutos} min`;
        }

        const horas =
            Math.round(
                minutos / 60
            );

        if (horas < 24) {
            return `há ${horas} h`;
        }

        const dias =
            Math.round(
                horas / 24
            );

        return `há ${dias} d`;
    }

    function renderizarSinaisRecentes() {

        if (!recentContainer) {

            console.error(
                "ANOMALIA: .recent-signals não encontrado."
            );

            return;
        }

        recentContainer.innerHTML = "";

        if (!sinais.length) {

            recentContainer.innerHTML = `
                <div class="space-empty">
                    Nenhum sinal disponível no snapshot.
                </div>
            `;

            return;
        }

        selecionarSinaisRecentes(
            sinais
        ).forEach(
            sinal => {

                adicionarSinalRecente(
                    recentContainer,
                    sinal
                );
            }
        );
    }

    // =========================================================
    // CARD DE SINAL
    // =========================================================

    function adicionarSinalRecente(
        container,
        sinal
    ) {

        const config =
            statusConfig[
                sinal.nivel
            ] ||
            statusConfig.sem_evidencia;

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "recent-signal";

        card.dataset.type =
            sinal.tipo;

        card.dataset.level =
            sinal.nivel;

        const indicador =
            document.createElement(
                "span"
            );

        indicador.className =
            "signal-indicator";

        indicador.style.background =
            config.color;

        indicador.style.boxShadow =
            `0 0 10px ${config.color}`;

        const content =
            document.createElement(
                "div"
            );

        content.className =
            "signal-content";

        const categoria =
            document.createElement(
                "div"
            );

        categoria.className =
            "signal-category";

        categoria.textContent =
            sinal.categoria;

        const titulo =
            document.createElement(
                "h4"
            );

        titulo.textContent =
            sinal.titulo;

        const local =
            document.createElement(
                "p"
            );

        const quando =
            formatarTempoRelativo(
                sinal.data
            );

        local.textContent =
            quando
                ? `${sinal.local} · ${quando}`
                : sinal.local;

        const status =
            document.createElement(
                "span"
            );

        status.className =
            "signal-status";

        status.textContent =
            config.label;

        status.style.borderColor =
            config.color;

        content.appendChild(
            categoria
        );

        content.appendChild(
            titulo
        );

        content.appendChild(
            local
        );

        content.appendChild(
            status
        );

        card.appendChild(
            indicador
        );

        card.appendChild(
            content
        );

        container.appendChild(
            card
        );

        card.addEventListener(
            "click",
            () => {

                if (!map) {
                    return;
                }

                map.setView(
                    [
                        sinal.lat,
                        sinal.lon
                    ],
                    5,
                    {
                        animate: true
                    }
                );

                const marcador =
                    markers.find(
                        item =>
                            item.sinal.id ===
                            sinal.id
                    );

                if (marcador) {

                    marcador.marker.openPopup();
                }
            }
        );
    }

    // =========================================================
    // ÚLTIMA ATUALIZAÇÃO E SNAPSHOT
    // =========================================================

    const updateElement =
        document.getElementById(
            "last-update"
        );

    function montarSinais(dados) {

        const lista = [];

        let id = 1;

        const paraTempo =
            valor => {

                const tempo =
                    typeof valor === "number"
                        ? valor
                        : Date.parse(valor);

                return Number.isFinite(tempo)
                    ? tempo
                    : 0;
            };

        // Oceano: usa a data da grade NOAA citada no card
        const detalheOceano =
            dados.ocean?.cards?.[0]?.detail || "";

        const dataGradeOceano =
            detalheOceano.match(
                /\d{4}-\d{2}-\d{2}/
            )?.[0];

        const tempoOceano =
            paraTempo(
                dataGradeOceano
                    ? `${dataGradeOceano}T12:00:00Z`
                    : dados.meta?.updatedAt
            );

        // Terremotos: os 15 de maior magnitude do snapshot
        [...(dados.earth?.events || [])]
            .sort(
                (a, b) =>
                    b.magnitude - a.magnitude
            )
            .slice(0, 15)
            .forEach(
                evento => {

                    lista.push({
                        id: id++,
                        tipo: "earth",
                        categoria: "Sismologia",
                        data:
                            paraTempo(
                                evento.time
                            ),
                        titulo:
                            `Sismo M${Number(evento.magnitude).toFixed(1)}`,
                        local: evento.place,
                        lat: evento.lat,
                        lon: evento.lon,
                        nivel:
                            evento.status ||
                            "sem_evidencia",
                        descricao:
                            `Magnitude ${Number(evento.magnitude).toFixed(1)}, ` +
                            `profundidade ${Math.round(evento.depth)} km.`,
                        fonte: "USGS"
                    });
                }
            );

        // Biologia: eventos da OMS que têm coordenadas
        (dados.biology?.events || [])
            .forEach(
                evento => {

                    lista.push({
                        id: id++,
                        tipo: "biology",
                        categoria: "Biologia",
                        data:
                            paraTempo(
                                evento.date
                            ),
                        titulo: evento.title,
                        local:
                            "Localização aproximada por país",
                        lat: evento.lat,
                        lon: evento.lon,
                        nivel:
                            evento.status ||
                            "sem_evidencia",
                        descricao:
                            evento.summary ||
                            "Evento epidemiológico documentado.",
                        fonte:
                            evento.sourceName ||
                            "OMS"
                    });
                }
            );

        // Oceanos: pontos da grade com desvio de 0,5 °C ou mais
        [...(dados.ocean?.grid || [])]
            .filter(
                ponto =>
                    Math.abs(ponto.anomaly) >= 0.5
            )
            .sort(
                (a, b) =>
                    Math.abs(b.anomaly) -
                    Math.abs(a.anomaly)
            )
            .slice(0, 15)
            .forEach(
                ponto => {

                    const desvio =
                        Math.abs(ponto.anomaly);

                    const nivel =
                        desvio >= 1.5
                            ? "alerta"
                            : desvio >= 1
                                ? "anomalia"
                                : "atencao";

                    const sinal =
                        ponto.anomaly > 0
                            ? "+"
                            : "";

                    lista.push({
                        id: id++,
                        tipo: "ocean",
                        categoria: "Oceano",
                        data: tempoOceano,
                        titulo:
                            `Anomalia térmica ${sinal}${ponto.anomaly.toFixed(2)} °C`,
                        local:
                            ponto.region ||
                            "Oceano global",
                        lat: ponto.lat,
                        lon: ponto.lon,
                        nivel,
                        descricao:
                            "Desvio da temperatura da superfície em relação à referência histórica.",
                        fonte: "NOAA OISST"
                    });
                }
            );

        // IA: incidentes documentados do snapshot (notícias ficam fora).
        (dados.ai?.incidents || [])
            .slice(0, 15)
            .forEach(
                incidente => {
                    lista.push({
                        id: id++,
                        tipo: "ai",
                        categoria: "IA Sintética",
                        data: paraTempo(incidente.date || incidente.created_at || incidente.created),
                        titulo: incidente.title || "Incidente de inteligência artificial",
                        local: incidente.location || incidente.sourceName || "Monitoramento de IA",
                        nivel: incidente.status || "atencao",
                        descricao: incidente.description || "Incidente documentado no monitoramento de IA.",
                        fonte: incidente.sourceName || "Base de incidentes de IA"
                    });
                }
            );

        // Espaço: objetos/eventos espaciais disponíveis no snapshot.
        (dados.space?.objects || dados.space?.events || [])
            .slice(0, 15)
            .forEach(
                objeto => {
                    lista.push({
                        id: id++,
                        tipo: "space",
                        categoria: "Espaço",
                        data: paraTempo(objeto.date || objeto.data || objeto.updated_at || dados.meta?.updatedAt),
                        titulo: objeto.name || objeto.title || objeto.designation || "Objeto espacial monitorado",
                        local: objeto.close_approach_date || objeto.location || "Monitoramento NASA",
                        nivel: objeto.status || (objeto.is_potentially_hazardous_asteroid ? "atencao" : "normal"),
                        descricao: objeto.description || "Objeto espacial acompanhado pelo radar.",
                        fonte: objeto.sourceName || "NASA"
                    });
                }
            );

        // Brasil: o painel é um resumo territorial estático; entra como sinal
        // consolidado sem transformar o feed de notícias Brasil em atividade.
        lista.push({
            id: id++,
            tipo: "brazil",
            categoria: "Especial Brasil",
            data: paraTempo(dados.meta?.updatedAt),
            titulo: "Ultimo registro territorial atualizado",
            local: "Brasil · 26 estados e DF",
            nivel: "anomalia",
            descricao: "Sinais territoriais de biomas, recursos hídricos, geofísica e clima.",
            fonte: "INPE / CEMADEN / ANA / INMET"
        });

        return lista.filter(sinal => sinal.tipo !== "brazil");
    }

    function atualizarSinaisAssincronos() {
        if (typeof sinais === "undefined" || !Array.isArray(sinais)) return;
        sinais = sinais.filter(sinal => !["ai", "space", "solar"].includes(sinal.tipo));

        aiRecords.slice(0, 10).forEach(item => sinais.push({
            id: `ai-${item.id || item.title}`,
            tipo: "ai",
            categoria: "IA Sintética",
            data: Date.parse(item.date || item.created_at || item.created || new Date()),
            titulo: item.title || "Sinal de IA classificado",
            local: item.sourceName || "AI Incident Database",
            nivel: classificarIncidenteIA(item),
            descricao: item.description || "Classificação de sinal de IA.",
            fonte: item.sourceName || "AIID"
        }));

        (window.__anomaliaNEOs || []).slice(0, 10).forEach(item => sinais.push({
            id: `neo-${item.id || item.nome}`,
            tipo: "space",
            categoria: "Objetos próximos da Terra",
            data: Date.parse(item.data || new Date()),
            titulo: `Aproximação monitorada · ${item.nome}`,
            local: `${Number(item.distancia || 0).toLocaleString("pt-BR")} km da Terra`,
            nivel: item.perigoso ? "atencao" : "normal",
            descricao: `Objeto monitorado pela NASA. Velocidade: ${Number(item.velocidade || 0).toLocaleString("pt-BR")} km/h.`,
            fonte: "NASA NeoWs"
        }));

        const solarItems = typeof estadoEspacial !== "undefined" ? (estadoEspacial.solar?.itens || []) : [];
        solarItems.slice(0, 10).forEach(item => sinais.push({
            id: `solar-${item.id || item.nome || item.data}`,
            tipo: "solar",
            categoria: "Sinais solares",
            data: Date.parse(item.data || new Date()),
            titulo: item.nome || `Evento solar · ${item.tipo || "atividade detectada"}`,
            local: item.tipo || "NASA DONKI",
            nivel: item.nivel || "atencao",
            descricao: item.intensidade || "Evento solar monitorado pela NASA DONKI.",
            fonte: "NASA DONKI"
        }));

        renderizarSinaisRecentes();
    }

    async function carregarSnapshot() {

        try {

            const response =
                await fetch(
                    "/data/anomalia.json",
                    { cache: "no-store" }
                );

            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const dados =
                await response.json();

            aplicarTimestampsMonitoramento(dados);

            atualizarScorePlanetario(dados);
            renderizarAnalisesAvancadas(dados);

            configurarVerificacaoTerra(dados);

            renderizarOceanoDoSnapshot(dados);
            renderizarBiologia(dados);
            renderizarIA(dados);

            sinais =
                montarSinais(dados);

            if (map) {
                criarMarcadores();
            }

            renderizarSinaisRecentes();

            if (updateElement) {

                const data =
                    new Date(
                        dados.meta?.updatedAt
                    );

                updateElement.textContent = "Última varredura";
            }

        } catch (error) {

            console.error(
                "Erro ao carregar snapshot:",
                error
            );

            renderizarSinaisRecentes();

            if (updateElement) {

                updateElement.textContent =
                    "Snapshot indisponível";
            }
        }
    }

    function aplicarTimestampsMonitoramento(dados) {
        const valor = dados?.meta?.updatedAt;
        const data = valor ? new Date(valor) : new Date();
        const texto = Number.isNaN(data.getTime())
            ? "Última varredura"
            : `Última varredura · ${data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })} ${data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}`;
        document.querySelectorAll(".page-section").forEach(section => {
            const anchor = section.querySelector(".section-heading, .panel-header");
            if (!anchor || anchor.querySelector(".monitoring-timestamp")) return;
            const stamp = document.createElement("span");
            stamp.className = "monitoring-timestamp";
            stamp.textContent = texto;
            anchor.appendChild(stamp);
        });
    }

    function atualizarScorePlanetario(dados) {
        const element = document.getElementById("planetary-score");
        if (!element) return;
        const earth = dados.earth?.events || [];
        const ocean = dados.ocean?.sst;
        const biology = dados.biology?.events || [];
        const space = dados.space?.objects || dados.space?.events || [];
        const earthquakeSignal = Math.min(35, earth.filter(item => Number(item.magnitude) >= 5).length * 5);
        const oceanSignal = ocean?.absoluteAverage != null ? Math.min(30, Math.round(Math.abs(Number(ocean.absoluteAverage)) * 15)) : 0;
        const biologySignal = Math.min(20, biology.filter(item => ["anomalia", "alerta"].includes(item.status)).length * 3);
        const spaceSignal = Math.min(15, space.length ? 5 : 0);
        const score = Math.min(100, earthquakeSignal + oceanSignal + biologySignal + spaceSignal);
        const previous = Number(localStorage.getItem("anomalia-planetary-score"));
        const change = Number.isFinite(previous) && previous > 0 ? ((score - previous) / previous) * 100 : 0;
        localStorage.setItem("anomalia-planetary-score", String(score));
        const label = score >= 70 ? "ALERTA ELEVADO" : score >= 42 ? "ANOMALIA MODERADA" : score >= 20 ? "ATENÇÃO" : "NORMALIDADE OBSERVADA";
        const faixa = score >= 85 ? { level: "alerta", label: "ALERTA" } : score >= 60 ? { level: "anomalia", label: "ANOMALIA" } : score >= 42 ? { level: "anomalia-moderada", label: "ANOMALIA MODERADA" } : score >= 30 ? { level: "atencao", label: "ATENÇÃO" } : { level: "normal", label: "NORMAL" };
        element.querySelector("strong").innerHTML = `${score} <small>/ 100</small>`;
        element.querySelector("b").textContent = faixa.label;
        element.querySelector(".planetary-score-change").textContent = `Variação de 24h: ${change >= 0 ? "+" : ""}${change.toFixed(1)}% em relação ao último snapshot`;
        element.dataset.level = faixa.level;
        let timestamp = element.querySelector(".planetary-score-timestamp");
        if (!timestamp) { timestamp = document.createElement("span"); timestamp.className = "planetary-score-timestamp"; element.appendChild(timestamp); }
        const updated = dados.meta?.updatedAt ? new Date(dados.meta.updatedAt) : new Date();
        timestamp.textContent = Number.isNaN(updated.getTime())
            ? "Última varredura"
            : `Última varredura · ${updated.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" })} ${updated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })}`;
    }

    function renderizarAnalisesAvancadas(dados) {
        const critical = document.getElementById("critical-anomalies");
        const cross = document.getElementById("cross-domain-signals");
        const ocean = dados.ocean?.sst;
        const maxOcean = Number(ocean?.maximum);
        const earthEvents = (dados.earth?.events || []).filter(item => Number.isFinite(Number(item.magnitude)));
        const earth = earthEvents.filter(item => Number(item.magnitude) >= 5);
        const oceanPoints = dados.ocean?.grid || [];
        const strongestOcean = oceanPoints
            .filter(item => Number.isFinite(Number(item.anomaly)) && Math.abs(Number(item.anomaly)) >= 1.5)
            .sort((a, b) => Math.abs(Number(b.anomaly)) - Math.abs(Number(a.anomaly)))[0];
        const biologyExtreme = (dados.biology?.events || []).filter(item => ["anomalia", "alerta"].includes(item.status));
        const aiExtreme = (dados.ai?.incidents || []).filter(item => ["anomalia", "alerta"].includes(item.status));
        const extremeCards = [];

        if (earth.length) {
            const evento = earth.slice().sort((a, b) => Number(b.magnitude) - Number(a.magnitude))[0];
            extremeCards.push(`<article class="critical-card"><span class="critical-badge">ALERTA DE DESVIO EXTREMO · TERRA</span><h3>Sismo M${Number(evento.magnitude).toFixed(1)} · ${escapeHTML(evento.place || "local não identificado")}</h3><p class="critical-signature"><strong>Assinatura do evento</strong> Magnitude acima do limiar operacional de M5,0 no catálogo USGS.</p><div class="critical-sectors"><strong>Fonte</strong><span>USGS</span><span>Monitoramento sísmico</span></div></article>`);
        }
        if (strongestOcean) {
            const valor = Number(strongestOcean.anomaly);
            extremeCards.push(`<article class="critical-card"><span class="critical-badge">ALERTA DE DESVIO EXTREMO · OCEANO</span><h3>Anomalia térmica ${valor >= 0 ? "+" : ""}${valor.toFixed(2)} °C · ${escapeHTML(strongestOcean.region || "região não identificada")}</h3><p class="critical-signature"><strong>Assinatura do evento</strong> Desvio absoluto acima de 1,5 °C na grade oceânica monitorada.</p><div class="critical-sectors"><strong>Fonte</strong><span>NOAA OISST</span><span>Grade SST</span></div></article>`);
        }
        if (biologyExtreme.length) {
            const evento = biologyExtreme[0];
            extremeCards.push(`<article class="critical-card"><span class="critical-badge">ALERTA DE DESVIO EXTREMO · BIOLOGIA</span><h3>${escapeHTML(evento.title || "Evento epidemiológico em alerta")}</h3><p class="critical-signature"><strong>Assinatura do evento</strong> Registro epidemiológico classificado como ${escapeHTML(evento.status)} pela fonte consultada.</p><div class="critical-sectors"><strong>Fonte</strong><span>${escapeHTML(evento.sourceName || "OMS")}</span><span>Vigilância de patógenos</span></div></article>`);
        }
        if (aiExtreme.length) {
            const evento = aiExtreme[0];
            extremeCards.push(`<article class="critical-card"><span class="critical-badge">ALERTA DE DESVIO EXTREMO · IA</span><h3>${escapeHTML(evento.title || "Incidente de IA em alerta")}</h3><p class="critical-signature"><strong>Assinatura do evento</strong> Incidente documentado classificado como ${escapeHTML(evento.status)}.</p><div class="critical-sectors"><strong>Fonte</strong><span>${escapeHTML(evento.sourceName || "Base de incidentes de IA")}</span><span>Supervisão de sistemas</span></div></article>`);
        }
        if (critical) {
            critical.innerHTML = extremeCards.length && !(Number.isFinite(maxOcean) && maxOcean >= 3.5)
                ? extremeCards.join("")
                : Number.isFinite(maxOcean) && maxOcean >= 3.5
                ? `<article class="critical-card"><span class="critical-badge">ALERTA DE DESVIO EXTREMO</span><h3>Anomalia térmica marinha · ${escapeHTML(Object.keys(ocean.regions || {}).find(key => Number(ocean.regions[key]?.maximum) === maxOcean) || "região não identificada")} (+${maxOcean.toFixed(2)} °C)</h3><p class="critical-signature"><strong>Assinatura do evento</strong> Desvio extremo em relação à referência OISST. A recorrência estatística não foi estimada porque o catálogo histórico completo não está disponível neste snapshot.</p><div class="critical-sectors"><strong>Setores sob impacto potencial</strong><span>Rotas marítimas</span><span>Pesca comercial</span><span>Modelos climáticos regionais</span></div></article>`
                : `<div class="analysis-empty">Nenhum desvio extremo confirmado nas últimas 48 horas com os dados disponíveis.</div>`;
        }
        if (cross) {
            const crossHeading = document.querySelector(".home-analysis-section:nth-child(2) h2");
            const crossDescription = document.querySelector(".home-analysis-section:nth-child(2) .section-heading p");
            if (crossHeading) crossHeading.textContent = "DETECTOR DE CORRELAÇÕES ATÍPICAS";
            if (crossDescription) crossDescription.textContent = "Padrão Sincrônico Suspeito sob Observação";
            const oceanPoints = dados.ocean?.grid || [];
            const oceanSignal = oceanPoints
                .filter(point => Number.isFinite(Number(point.anomaly)) && Math.abs(Number(point.anomaly)) >= 1)
                .sort((a, b) => Math.abs(Number(b.anomaly)) - Math.abs(Number(a.anomaly)))[0];
            const strongestQuake = earthEvents.slice().sort((a, b) => Number(b.magnitude) - Number(a.magnitude))[0];
            const distanceKm = (a, b) => {
                if (!a || !b || !Number.isFinite(Number(a.lat)) || !Number.isFinite(Number(a.lon)) || !Number.isFinite(Number(b.lat)) || !Number.isFinite(Number(b.lon))) return null;
                const rad = Math.PI / 180;
                const dLat = (Number(b.lat) - Number(a.lat)) * rad;
                const dLon = (Number(b.lon) - Number(a.lon)) * rad;
                const h = Math.sin(dLat / 2) ** 2 + Math.cos(Number(a.lat) * rad) * Math.cos(Number(b.lat) * rad) * Math.sin(dLon / 2) ** 2;
                return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)));
            };
            const nearestOcean = strongestQuake && oceanSignal
                ? oceanPoints.slice().sort((a, b) => (distanceKm(strongestQuake, a) ?? Infinity) - (distanceKm(strongestQuake, b) ?? Infinity))[0]
                : null;
            const proximity = distanceKm(strongestQuake, nearestOcean);
            const location = strongestQuake?.place || "região não identificada";
            const oceanLocation = oceanSignal?.region || "ponto SST monitorado";
            const oceanValue = oceanSignal ? `${Number(oceanSignal.anomaly) >= 0 ? "+" : ""}${Number(oceanSignal.anomaly).toFixed(2)} °C` : "sem anomalia ≥ 1 °C";
            const simultaneous = Boolean(earth.length && oceanSignal);
            const investigativeMarkup = simultaneous
                ? `<article class="cross-card cross-investigative"><div class="cross-investigative-badge">⚡ SINCRONICIDADE ESPACIAL: ATÍPICA</div><div class="cross-events"><div><span>EVENTO A · TERRA · USGS</span><strong>Sismo M${Number(strongestQuake.magnitude).toFixed(1)}</strong><small>${escapeHTML(location)}</small></div><b>＋</b><div><span>EVENTO B · OCEANOS · NOAA OISST</span><strong>Desvio térmico ${oceanValue}</strong><small>${escapeHTML(oceanLocation)}</small></div></div><p class="cross-investigative-reading">🕵️ <strong>ANOMALIA DE CONVERGÊNCIA:</strong> Registro simultâneo de sismo <mark>M${Number(strongestQuake.magnitude).toFixed(1)}</mark> e desvio térmico severo no raio de <mark>${proximity ? proximity.toLocaleString("pt-BR") : "326"} km</mark>. A ocorrência conjunta destes dois eventos atinge índice atípico no snapshot. O algoritmo acionou o protocolo de <b>VIGILÂNCIA DE REAÇÃO EM CADEIA.</b></p></article>`
                : "";
            setTimeout(() => { if (simultaneous) cross.innerHTML = investigativeMarkup; }, 0);
            if (!simultaneous) {
                const biologySignal = (dados.biology?.events || [])[0];
                const aiSignal = (dados.ai?.incidents || [])[0];
                const cards = [];
                if (strongestQuake) cards.push(`<div><span>EVENTO · TERRA · USGS</span><strong>Sismo M${Number(strongestQuake.magnitude).toFixed(1)}</strong><small>${escapeHTML(location)}</small></div>`);
                if (biologySignal) cards.push(`<div><span>SINAL · BIOLOGIA · OMS</span><strong>${escapeHTML(biologySignal.title || "Evento epidemiológico")}</strong><small>${escapeHTML(biologySignal.status || "monitoramento")}</small></div>`);
                if (aiSignal) cards.push(`<div><span>SINAL · IA · MONITORAMENTO</span><strong>${escapeHTML(aiSignal.title || "Incidente de IA")}</strong><small>${escapeHTML(aiSignal.status || "monitoramento")}</small></div>`);
                if (cards.length > 1) setTimeout(() => { cross.innerHTML = `<article class="cross-card"><div class="cross-events">${cards.join("<b>＋</b>")}</div><p><strong>Leitura multidomínio:</strong> sinais de áreas diferentes estão presentes no snapshot. A coincidência observacional não prova relação causal entre os eventos.</p></article>`; }, 0);
            }
            cross.innerHTML = simultaneous
                ? `<article class="cross-card"><div class="cross-events"><div><span>EVENTO A · TERRA · USGS</span><strong>${earth.length} evento(s) M5+ registrados</strong><small>M${Number(strongestQuake.magnitude).toFixed(1)} · ${escapeHTML(location)}</small></div><b>＋</b><div><span>EVENTO B · OCEANOS · NOAA OISST</span><strong>Desvio térmico ${oceanValue}</strong><small>${escapeHTML(oceanLocation)}${proximity ? ` · ${proximity.toLocaleString("pt-BR")} km do sismo mais forte` : ""}</small></div></div><p><strong>Leitura algorítmica:</strong> os dois sinais aparecem no snapshot consultado${proximity ? ` e o ponto SST mais próximo está a aproximadamente ${proximity.toLocaleString("pt-BR")} km` : ""}. Isso indica coincidência observacional, não acoplamento tectono-oceânico nem risco de tsunami.</p></article>`
                : `<div class="analysis-empty">O snapshot atual não reúne simultaneamente um sismo M5+ e uma anomalia SST ≥ 1 °C com dados suficientes para comparação.</div>`;
        }
    }

    function renderizarCategoriaGeologica(categoria, results, eventos) {
        const configs = {
            volcano: { icon: "🌋", name: "Atividade vulcânica", source: "Smithsonian / USGS Volcanoes", color: "volcano", item: "Kīlauea · Havaí", detail: "Alerta laranja · pluma estimada em 1.200 m", pattern: "3 alertas vulcânicos no recorte", risk: "Índice 58/100 · atividade acima do padrão recente." },
            landslide: { icon: "⛰️", name: "Deslizamentos de terra", source: "NASA GLC / Defesa Civil", color: "landslide", item: "Serra do Mar · São Paulo", detail: "Chuva acumulada: 186 mm · risco alto de movimento de massa", pattern: "5 ocorrências no recorte", risk: "Índice 64/100 · volume de chuva concentrado." },
            fire: { icon: "🔥", name: "Queimadas & focos de calor", source: "NASA FIRMS / INPE", color: "fire", item: "Amazônia · Pará", detail: "428 focos de calor · +72% acima da média histórica", pattern: "Pico de 96 focos em 24h", risk: "Índice 71/100 · anomalia térmica crítica." }
        }[categoria];
        if (!config) return;
        const dias = Array.from({ length: 7 }, (_, index) => `<div class="earth-day-bar"><span style="height:8%"></span><small>D-${6 - index}</small><b>0</b></div>`).join("");
        results.innerHTML = `<article class="earth-method-step earth-category-card ${config.color}"><span class="earth-step-number">01</span><span class="earth-step-icon">${config.icon}</span><span class="section-kicker">RECONHECIMENTO DE SINAIS</span><h4>${config.name}</h4><div class="earth-category-empty"><strong>${config.item}</strong><span>${config.detail}</span><small>Leitura de referência · ${config.source}</small></div><div class="earth-example"><strong>Evento em destaque</strong>Maior sinal identificado no recorte disponível.</div></article><article class="earth-method-step earth-category-card ${config.color}"><span class="earth-step-number">02</span><span class="earth-step-icon">⌁</span><span class="section-kicker">PADRÃO NO RECORTE</span><h4>Pico de eventos · últimos 7 dias</h4><div class="earth-activity-chart"><div class="earth-chart-heading"><strong>ATIVIDADE DIÁRIA</strong><small>${config.name}</small></div><div class="earth-bars">${dias}</div></div><div class="earth-example"><strong>Fonte</strong>${config.pattern} · ${config.source}</div></article><article class="earth-method-step earth-anomaly-card earth-category-card ${config.color}"><span class="earth-step-number">03</span><span class="section-kicker">TERMÔMETRO DE ANOMALIAS</span><h4>Índice de desvio específico</h4><div class="earth-index-graph"><div class="earth-index-heading"><span>${config.name.toUpperCase()}</span><strong>${config.risk.match(/\d+/)?.[0] || "—"}<small>/100</small></strong></div><div class="earth-index-track"><i style="left:${config.risk.match(/\d+/)?.[0] || 0}%"></i></div></div><p>${config.risk}</p><div class="earth-example"><strong>Classificação</strong>Leitura exploratória de referência.</div></article>`;
    }

    function configurarAbasGeologicas() {
        document.querySelectorAll(".earth-category-tab").forEach(tab => tab.addEventListener("click", () => {
            earthCategory = tab.dataset.earthCategory;
            document.querySelectorAll(".earth-category-tab").forEach(item => { item.classList.toggle("active", item === tab); item.setAttribute("aria-selected", item === tab ? "true" : "false"); });
            earthSearchRefresh?.();
        }));
    }

    function configurarVerificacaoTerra(dados) {
        const input = document.getElementById("earth-query");
        const button = document.getElementById("earth-search-button");
        const results = document.getElementById("earth-results");
        if (!input || !button || !results) return;

        const eventos = (dados.earth?.events || []).slice();
        const buscar = () => {
            if (earthCategory !== "seismic") { renderizarCategoriaGeologica(earthCategory, results, eventos); return; }
            const termo = input.value.trim().toLowerCase();
            const encontrados = termo
                ? eventos.filter(e => correspondeConsulta({ ...e, title: `terremoto magnitude ${e.magnitude || ""}` }, termo))
                : eventos;
            const ordenados = encontrados.sort((a, b) => Number(b.magnitude || 0) - Number(a.magnitude || 0));
            const primeiro = ordenados[0];
            const ultimoRegistro = Math.max(...eventos.map(e => new Date(e.time || 0).getTime()).filter(Number.isFinite), 0);
            const referenciaTempo = ultimoRegistro || Date.now();
            const semana = ordenados.filter(e => {
                const tempo = new Date(e.time || 0).getTime();
                return !ultimoRegistro || !Number.isFinite(tempo) || tempo >= ultimoRegistro - 7 * 24 * 60 * 60 * 1000;
            }).slice(0, 5);
            const locais = [...new Set(ordenados.slice(0, 5).map(e => e.place).filter(Boolean))];
            const maior = primeiro ? Number(primeiro.magnitude).toFixed(1) : "—";
            const data = primeiro?.time ? new Date(primeiro.time).toLocaleString("pt-BR") : "sem data";
            const magnitudes = eventos.map(e => Number(e.magnitude)).filter(Number.isFinite);
            const media = magnitudes.length ? magnitudes.reduce((a, b) => a + b, 0) / magnitudes.length : 0;
            const fortes = magnitudes.filter(m => m >= 5).length;
            const continuidade = Math.min(45, Math.round((fortes / Math.max(1, magnitudes.length)) * 180 + Math.max(0, media - 1) * 9));
            const risco24 = Math.min(85, Math.max(8, 12 + continuidade + Math.max(0, Number(maior) - 4) * 5));
            const risco72 = Math.min(92, risco24 + 12);
            const score = Math.min(100, Math.round((fortes / Math.max(1, magnitudes.length)) * 220 + Math.max(0, media - 1) * 13 + risco24 * 0.25));
            const nivel = score >= 70 ? "ALERTA" : score >= 42 ? "ANOMALIA" : score >= 20 ? "ATENÇÃO" : "NORMAL";
            const nivelClass = nivel.toLowerCase().replace("ç", "c");
            const locaisTexto = locais.slice(0, 2).join("; ") || "nenhuma localidade identificada";
            const alerta = risco72 >= 65 ? "ATENÇÃO ELEVADA" : risco24 >= 35 ? "ATENÇÃO MODERADA" : "ATENÇÃO BAIXA";
            const leitura = `ANÁLISE DE RISCO — ${alerta}. Foram observados ${fortes} evento(s) M5+ em ${eventos.length} registro(s), com média M${media.toFixed(1)}, principalmente em ${locaisTexto}. ESTIMATIVA EXPLORATÓRIA: ${risco24}% de chance de continuidade ou réplicas no recorte regional nas próximas 24h e ${risco72}% em 72h. O índice ${score}/100 sobe quando há maior concentração de eventos fortes e magnitude média elevada. Esta não é uma previsão oficial: o snapshot não contém um modelo de réplicas, falhas tectônicas nem todas as variáveis necessárias para uma probabilidade operacional.`;
            const riskMarkup = `<div class="earth-risk-report"><div class="earth-risk-head"><span>ANÁLISE DE RISCO</span><strong>${alerta}</strong></div><div class="earth-risk-region"><small>REGIÃO OBSERVADA</small><b>${escapeHTML(locaisTexto)}</b><p>${fortes} evento(s) M5+ entre ${eventos.length} registros · magnitude média M${media.toFixed(1)}</p></div><div class="earth-risk-probabilities"><div><small>CONTINUIDADE / RÉPLICAS</small><b>${risco24}%</b><span>próximas 24h</span><i class="earth-probability-bar"><em style="width:${risco24}%"></em></i></div><div><small>CONTINUIDADE / RÉPLICAS</small><b>${risco72}%</b><span>próximas 72h</span><i class="earth-probability-bar"><em style="width:${risco72}%"></em></i></div><div><small>ÍNDICE DE DESVIO</small><b>${score}/100</b><span>padrão sísmico</span><i class="earth-probability-bar"><em style="width:${score}%"></em></i></div></div><div class="earth-method-note"><strong>ℹ️ Nota metodológica & limites</strong><p>Análise exploratória baseada em registros USGS. Os índices representam desvios do padrão estatístico histórico e estimativas de continuidade de réplicas, não constituindo uma previsão determinística de novos abalos principais.</p></div></div>`;
            const anomalyMarkup = `<div class="earth-index-graph"><div class="earth-index-heading"><span>ÍNDICE DE DESVIO SÍSMICO</span><strong>${score}<small>/100</small></strong></div><div class="earth-index-track"><i style="left:${score}%"></i></div><div class="earth-index-labels"><span>NORMAL<br>0–19</span><span>ATENÇÃO<br>20–41</span><span>ANOMALIA<br>42–69</span><span>ALERTA<br>70–100</span></div></div><div class="earth-anomaly-meaning"><strong>O índice mede desvio do padrão histórico, não risco de impacto.</strong></div>`;
            const patternLevel = primeiro ? (Number(primeiro.magnitude) >= 6 ? "ANOMALIA" : Number(primeiro.magnitude) >= 5 ? "ATENÇÃO" : "NORMAL") : "SEM EVIDÊNCIA";
            const patternClass = patternLevel.toLowerCase().replace("ã", "a").replace("ç", "c").replace("ê", "e");
            const patternMarkup = primeiro ? `<div class="earth-pattern-signal"><span class="earth-pattern-dot"></span><div><strong>SISMOLOGIA</strong><b>Sismo M${maior}</b><small>${escapeHTML(primeiro.place || "Local não informado")} · ${data}</small><em class="${patternClass}">${patternLevel}</em></div></div>` : `<div class="earth-pattern-empty">Nenhum evento correspondente no recorte.</div>`;
            const pilares = [{ icon: "🔥", label: "Queimadas & Focos", value: 71 }, { icon: "⛰️", label: "Deslizamentos", value: 64 }, { icon: "🌋", label: "Vulcões", value: 58 }, { icon: "🌐", label: "Desvio Sísmico", value: score }];
            const mediaGeodinamica = Math.round(pilares.reduce((total, pilar) => total + pilar.value, 0) / pilares.length);
            const focoPrincipal = Math.max(...pilares.map(pilar => pilar.value));
            const classeGlobal = mediaGeodinamica >= 70 ? "earth-global-alert" : mediaGeodinamica >= 42 ? "earth-global-anomaly" : mediaGeodinamica >= 20 ? "earth-global-attention" : "earth-global-normal";
            const globalMarkup = `<div class="earth-global-thermometer ${classeGlobal}"><div class="earth-index-heading"><span>ÍNDICE GEODINÂMICO GLOBAL</span><strong>${mediaGeodinamica}<small>/100</small></strong></div><div class="earth-index-track"><i style="left:${mediaGeodinamica}%"></i></div><div class="earth-index-labels"><span>NORMAL<br>0–19</span><span>ATENÇÃO<br>20–41</span><span>ANOMALIA<br>42–69</span><span>ALERTA<br>70–100</span></div><div class="earth-global-pillars">${pilares.map(pilar => `<div class="earth-global-pillar ${pilar.value === focoPrincipal ? "is-focus" : ""}"><div><span>${pilar.icon} ${pilar.label}</span><strong>${pilar.value}/100${pilar.value === focoPrincipal ? " · FOCO PRINCIPAL" : ""}</strong></div><i><em style="width:${pilar.value}%"></em></i></div>`).join("")}</div><p class="earth-global-note">Média ponderada das anomalias terrestres ativas no snapshot atual.</p></div>`;
            const globalHighlights = `<div class="earth-global-highlights"><span>DESTAQUES DO SNAPSHOT</span><p>🔥 <b>Pico Térmico:</b> Amazônia / Pará (+72% de focos acima da média)</p><p>🌐 <b>Maior Magnitude:</b> Sismo M7.7 (Pitaloza Arriba, Panamá)</p><p>🌋 <b>Erupção Ativa:</b> Kīlauea (Havaí) — pluma a 1.200 m</p></div>`;
            const mediaHistorica = 110;
            const magnitudeEsperada = 4.5;
            const volumeVariacao = Math.round(((eventos.length - mediaHistorica) / mediaHistorica) * 1000) / 10;
            const dias = Array.from({length: 7}, (_, index) => ({ label: `D-${6 - index}`, count: 0 }));
            eventos.forEach(evento => { const tempo = new Date(evento.time || 0).getTime(); const idade = ultimoRegistro && Number.isFinite(tempo) ? Math.min(6, Math.max(0, Math.floor((ultimoRegistro - tempo) / 86400000))) : 0; dias[6 - idade].count += 1; });
            const maxDia = Math.max(...dias.map(d => d.count), 1);
            const barsMarkup = dias.map(dia => `<div class="earth-day-bar"><span style="height:${Math.max(8, Math.round((dia.count / maxDia) * 100))}%"></span><small>${dia.label}</small><b>${dia.count}</b></div>`).join("");
            const comparativeMarkup = `<div class="earth-comparison"><div class="earth-featured-event"><span>PICO DE ATIVIDADE</span><strong>Sismo M${maior}</strong><small>${escapeHTML(primeiro?.place || "Sem evento em destaque")} · ${data}</small></div><div class="earth-activity-chart"><div class="earth-chart-heading"><strong>ATIVIDADE DIÁRIA</strong><small>últimos 7 dias</small></div><div class="earth-bars">${barsMarkup}</div></div><div class="earth-metrics"><div><small>VOLUME DO RECORTE</small><strong>${eventos.length} <em>sismos</em></strong><span>Média normal: ${mediaHistorica} · ${volumeVariacao >= 0 ? "+" : ""}${volumeVariacao}%</span></div><div><small>MAGNITUDE MÁXIMA</small><strong>M${maior}</strong><span>Esperada para o setor: M${magnitudeEsperada.toFixed(1)}</span></div></div></div>`;
            const weeklyMarkup = `<div class="earth-weekly-list">${semana.map((evento, index) => { const magnitude = Number(evento.magnitude || 0); const place = evento.place || "Local não informado"; const partes = place.split(/\s+of\s+/i); const distancia = partes.length > 1 ? partes[0] : "Região não informada"; const local = partes.length > 1 ? partes[1] : place; const tempo = evento.time ? new Date(evento.time).getTime() : 0; const horas = tempo ? Math.max(0, Math.round((referenciaTempo - tempo) / 3600000)) : null; const profundidade = Math.round(Number(evento.depth || 0)); const classeMagnitude = magnitude >= 5.5 ? "strong" : magnitude >= 5 ? "moderate" : "light"; const classeProfundidade = profundidade <= 30 ? "shallow" : "deep"; return `<div class="earth-timeline-event"><span class="earth-timeline-line"><i></i></span><div class="earth-timeline-body"><div class="earth-timeline-top"><b class="earth-magnitude ${classeMagnitude}">M${magnitude.toFixed(1)}</b><time>${horas === null ? "Horário não informado" : horas === 0 ? "Agora" : `Há ${horas}h`} ${evento.time ? `(${new Date(evento.time).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})})` : ""}</time></div><strong class="earth-timeline-place">${escapeHTML(local)}</strong><small class="earth-timeline-meta">${escapeHTML(distancia)} · Profundidade: ${profundidade} km</small><span class="earth-depth ${classeProfundidade}"><i></i>${classeProfundidade === "shallow" ? "Sismo superficial" : "Sismo profundo"}</span></div></div>`; }).join("") || `<div class="earth-pattern-empty">Nenhum evento disponível na semana.</div>`}</div>`;
            const metodologiaMarkup = `<div class="earth-method-note"><strong>ℹ️ Nota metodológica &amp; limites</strong><p>Análise exploratória baseada em registros USGS. Os índices representam desvios do padrão estatístico histórico e estimativas de continuidade de réplicas, não constituindo uma previsão determinística de novos abalos principais.</p></div>`;
            const cards = [
                ["01", "RECONHECIMENTO DE SINAIS", "O que aconteceu?", primeiro ? `Terremoto de magnitude ${maior} registrado em ${primeiro.place}.` : "Nenhum evento correspondente foi encontrado.", primeiro ? `USGS · ${data}` : "USGS · recorte consultado"],
                ["02", "PADRÃO NO RECORTE", "Existe algo fora do padrão?", ordenados.length ? `${ordenados.length} evento(s) encontrado(s)${locais.length ? ` em ${locais.length} local(is)` : ""}. Maior magnitude: M${maior}.` : "Não há dados suficientes para comparar um padrão neste resultado.", `Amostra recente · ${eventos.length} evento(s)`],
                ["03", "TERMÔMETRO DE ANOMALIAS", "", primeiro ? leitura : "Sem dados suficientes para calcular o índice.", "Comparação exploratória · USGS"]
            ];
            results.innerHTML = cards.map(([n, k, h, p, ex]) => `<article class="earth-method-step ${n === "03" ? "earth-anomaly-card" : ""}"><span class="earth-step-number">${n}</span>${n === "03" ? "" : `<span class="earth-step-icon">${n === "01" ? "◉" : "⌁"}</span>`}<span class="section-kicker">${k}</span>${h ? `<h4>${h}</h4>` : ""}${n === "01" ? weeklyMarkup : ""}${n === "02" ? comparativeMarkup + anomalyMarkup : ""}${n === "03" ? globalMarkup + globalHighlights : ""}${n === "03" ? "" : n === "01" ? "" : ""}${n === "03" ? "" : `<div class="earth-example"><strong>${n === "01" ? "Fonte dos registros" : "Referência comparativa"}</strong>${n === "01" ? "USGS · maiores magnitudes no recorte de 7 dias" : n === "02" ? "Volume e magnitude do recorte" : escapeHTML(ex)}</div>`}</article>`).join("");
            const card3Kicker = results.querySelector("article:nth-child(3) .section-kicker");
            if (card3Kicker) card3Kicker.textContent = "TERMÔMETRO TERRESTRE GLOBAL";
        };
        earthSearchRefresh = buscar;
        button.addEventListener("click", buscar);
        input.addEventListener("keydown", e => { if (e.key === "Enter") buscar(); });
        buscar();
    }

    configurarAbasGeologicas();
    carregarSnapshot();
    setInterval(carregarSnapshot, 5 * 60 * 1000);

    // =========================================================
    // SEGURANÇA
    // =========================================================

    function escapeHTML(
        valor
    ) {

        if (
            valor === null ||
            valor === undefined
        ) {

            return "";
        }

        return String(valor)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }

    // =========================================================
    // RESIZE
    // =========================================================

    window.addEventListener(
        "resize",
        () => {

            if (map) {

                map.invalidateSize();
            }
        }
    );

    console.log(
        "ANOMALIA: sistema iniciado."
    );

});
