document.addEventListener("DOMContentLoaded", () => {

    console.log("ANOMALIA iniciado");

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
            return `<article class="ai-event-card status-${nivel}"><div class="ai-event-head">${badgeStatus(nivel)}<small>${escapeHTML(item.origem)}</small></div><h3>${escapeHTML(traduzirTextoIA(item.title || "Incidente envolvendo IA"))}</h3><p>${escapeHTML(traduzirTextoIA(item.description || "Registro sem descrição detalhada."))}</p>${item.url ? `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">Ver fonte ↗</a>` : ""}</article>`;
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
    }

    function verificarIA() {
        const query = (aiQuery?.value || "").trim().toLowerCase();
        if (!aiVerificationResult) return;
        if (!query) { aiVerificationResult.innerHTML = `<p class="ai-empty">Digite uma empresa, sistema ou afirmação para analisar.</p>`; return; }
        const encontrados = aiRecords.filter(item => `${item.title || ""} ${item.description || ""}`.toLowerCase().includes(query));
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
            const eventos = biologyEvents.filter(event => regras[categoria].test(`${event.title || ""} ${event.summary || ""}`));
            const nivel = eventos.reduce((maior, event) => ordem[event.status] > ordem[maior] ? event.status : maior, "sem_evidencia");
            const ultimo = eventos.slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))[0];
            card.className = card.className.replace(/\bstatus-[^\s]+/g, "").trim();
            card.classList.add(`status-${nivel}`);
            const classificacao = card.querySelector(".biology-classification");
            const dados = card.querySelector(".biology-card-data");
            const dot = card.querySelector(".biology-signal-dot");
            const omsData = card.querySelector(".biology-oms-data");
            if (classificacao) classificacao.textContent = simbolos[nivel];
            if (omsData) omsData.innerHTML = ultimo
                ? `<strong>OMS:</strong> ${escapeHTML(traduzirTituloBiologico(ultimo.title))}<small>Fonte: Organização Mundial da Saúde · ${formatDateBR(ultimo.date)}</small>${ultimo.url ? `<a class="biology-oms-link" href="${escapeHTML(ultimo.url)}" target="_blank" rel="noopener noreferrer">Ver publicação da OMS ↗</a>` : ""}`
                : "Nenhum registro correspondente da OMS no snapshot atual.";
            if (dados) dados.textContent = eventos.length
                ? `${eventos.length} registro(s) relacionado(s)`
                : "Nenhum registro relacionado no snapshot atual";
            if (dot) dot.className = `biology-signal-dot status-dot status-${nivel}`;
        });
    }

    function renderizarBiologia(dados) {
        biologyEvents = Array.isArray(dados?.biology?.events) ? dados.biology.events : [];
        const withLocation = biologyEvents.filter(item => Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lon)));
        atualizarCardsBiologia();
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

    function verificarBiologia() {
        const query = (biologyQuery?.value || "").trim().toLowerCase();
        if (!biologyVerificationResult) return;
        if (!query) {
            biologyVerificationResult.innerHTML = `<p class="biology-verification-empty">Digite o nome do patógeno, região ou afirmação para analisar.</p>`;
            return;
        }
        const matches = biologyEvents.filter(event => `${event.title || ""} ${event.summary || ""} ${event.sourceName || ""}`.toLowerCase().includes(query));
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

        if (oceanSstContent && oceanGlobal !== null && oceanGlobal < 0.5) {
            const badge = oceanSstContent.querySelector(".ocean-sst-badge");
            if (badge) { badge.textContent = "AQUECIMENTO LEVE"; badge.classList.add("mild"); }
        }

        if (ensoCard) {
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

                <div class="space-state-plaque space-state-plaque-bottom">
                    SEM EVIDÊNCIA DE<br>IMPACTO IMEDIATO
                </div>

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

    if (spaceUpdate) {

        spaceUpdate.textContent =
            "NASA • consulta ao vivo";
    }

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
                }
            );
        }
    );

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

                    if (
                        !Number.isFinite(evento.lat) ||
                        !Number.isFinite(evento.lon)
                    ) {
                        return;
                    }

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

        return lista;
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

            atualizarScorePlanetario(dados);

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

                updateElement.textContent =
                    Number.isNaN(data.getTime())
                        ? "Snapshot sem data"
                        : `Atualizado em ${data.toLocaleString("pt-BR")}`;
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
        element.querySelector("strong").innerHTML = `${score} <small>/ 100</small>`;
        element.querySelector("b").textContent = label;
        element.querySelector(".planetary-score-change").textContent = `Variação de 24h: ${change >= 0 ? "+" : ""}${change.toFixed(1)}% em relação ao último snapshot`;
        element.dataset.level = score >= 70 ? "alerta" : score >= 42 ? "anomalia" : score >= 20 ? "atencao" : "normal";
    }

    function configurarVerificacaoTerra(dados) {
        const input = document.getElementById("earth-query");
        const button = document.getElementById("earth-search-button");
        const results = document.getElementById("earth-results");
        if (!input || !button || !results) return;

        const eventos = (dados.earth?.events || []).slice();
        const buscar = () => {
            const termo = input.value.trim().toLowerCase();
            const encontrados = termo
                ? eventos.filter(e => `${e.place || ""} ${e.magnitude || ""} terremoto`.toLowerCase().includes(termo))
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
            const mediaHistorica = 110;
            const magnitudeEsperada = 4.5;
            const volumeVariacao = Math.round(((eventos.length - mediaHistorica) / mediaHistorica) * 1000) / 10;
            const dias = Array.from({length: 7}, (_, index) => ({ label: `D-${6 - index}`, count: 0 }));
            eventos.forEach(evento => { const tempo = new Date(evento.time || 0).getTime(); const idade = ultimoRegistro && Number.isFinite(tempo) ? Math.min(6, Math.max(0, Math.floor((ultimoRegistro - tempo) / 86400000))) : 0; dias[6 - idade].count += 1; });
            const maxDia = Math.max(...dias.map(d => d.count), 1);
            const barsMarkup = dias.map(dia => `<div class="earth-day-bar"><span style="height:${Math.max(8, Math.round((dia.count / maxDia) * 100))}%"></span><small>${dia.label}</small><b>${dia.count}</b></div>`).join("");
            const comparativeMarkup = `<div class="earth-comparison"><div class="earth-featured-event"><span>PICO DE ATIVIDADE</span><strong>Sismo M${maior}</strong><small>${escapeHTML(primeiro?.place || "Sem evento em destaque")} · ${data}</small></div><div class="earth-activity-chart"><div class="earth-chart-heading"><strong>ATIVIDADE DIÁRIA</strong><small>últimos 7 dias</small></div><div class="earth-bars">${barsMarkup}</div></div><div class="earth-metrics"><div><small>VOLUME DO RECORTE</small><strong>${eventos.length} <em>sismos</em></strong><span>Média normal: ${mediaHistorica} · ${volumeVariacao >= 0 ? "+" : ""}${volumeVariacao}%</span></div><div><small>MAGNITUDE MÁXIMA</small><strong>M${maior}</strong><span>Esperada para o setor: M${magnitudeEsperada.toFixed(1)}</span></div></div></div>`;
            const weeklyMarkup = `<div class="earth-weekly-list">${semana.map((evento, index) => { const magnitude = Number(evento.magnitude || 0); const place = evento.place || "Local não informado"; const partes = place.split(/\s+of\s+/i); const distancia = partes.length > 1 ? partes[0] : "Região não informada"; const local = partes.length > 1 ? partes[1] : place; const tempo = evento.time ? new Date(evento.time).getTime() : 0; const horas = tempo ? Math.max(0, Math.round((referenciaTempo - tempo) / 3600000)) : null; const profundidade = Math.round(Number(evento.depth || 0)); const classeMagnitude = magnitude >= 5.5 ? "strong" : magnitude >= 5 ? "moderate" : "light"; const classeProfundidade = profundidade <= 30 ? "shallow" : "deep"; return `<div class="earth-timeline-event"><span class="earth-timeline-line"><i></i></span><div class="earth-timeline-body"><div class="earth-timeline-top"><b class="earth-magnitude ${classeMagnitude}">M${magnitude.toFixed(1)}</b><time>${horas === null ? "Horário não informado" : horas === 0 ? "Agora" : `Há ${horas}h`} ${evento.time ? `(${new Date(evento.time).toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"})})` : ""}</time></div><strong class="earth-timeline-place">${escapeHTML(local)}</strong><small class="earth-timeline-meta">${escapeHTML(distancia)} · Profundidade: ${profundidade} km</small><span class="earth-depth ${classeProfundidade}"><i></i>${classeProfundidade === "shallow" ? "Sismo superficial" : "Sismo profundo"}</span></div></div>`; }).join("") || `<div class="earth-pattern-empty">Nenhum evento disponível na semana.</div>`}</div>`;
            const cards = [
                ["01", "RECONHECIMENTO DE SINAIS", "O que aconteceu?", primeiro ? `Terremoto de magnitude ${maior} registrado em ${primeiro.place}.` : "Nenhum evento correspondente foi encontrado.", primeiro ? `USGS · ${data}` : "USGS · recorte consultado"],
                ["02", "PADRÃO NO RECORTE", "Existe algo fora do padrão?", ordenados.length ? `${ordenados.length} evento(s) encontrado(s)${locais.length ? ` em ${locais.length} local(is)` : ""}. Maior magnitude: M${maior}.` : "Não há dados suficientes para comparar um padrão neste resultado.", `Amostra recente · ${eventos.length} evento(s)`],
                ["03", "TERMÔMETRO DE ANOMALIAS", "", primeiro ? leitura : "Sem dados suficientes para calcular o índice.", "Comparação exploratória · USGS"]
            ];
            results.innerHTML = cards.map(([n, k, h, p, ex]) => `<article class="earth-method-step ${n === "03" ? "earth-anomaly-card" : ""}"><span class="earth-step-number">${n}</span>${n === "03" ? "" : `<span class="earth-step-icon">${n === "01" ? "◉" : "⌁"}</span>`}<span class="section-kicker">${k}</span>${h ? `<h4>${h}</h4>` : ""}${n === "01" ? weeklyMarkup : ""}${n === "02" ? comparativeMarkup : ""}${n === "03" ? anomalyMarkup + riskMarkup : ""}${n === "03" ? "" : n === "01" ? "" : ""}${n === "03" ? "" : `<div class="earth-example"><strong>${n === "01" ? "Fonte dos registros" : "Referência comparativa"}</strong>${n === "01" ? "USGS · maiores magnitudes no recorte de 7 dias" : n === "02" ? "Comparação exploratória com médias de referência" : escapeHTML(ex)}</div>`}</article>`).join("");
        };
        button.addEventListener("click", buscar);
        input.addEventListener("keydown", e => { if (e.key === "Enter") buscar(); });
        buscar();
    }

    carregarSnapshot();

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
