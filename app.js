document.addEventListener("DOMContentLoaded", () => {

    console.log("ANOMALIA iniciado");

    // =========================================================
    // CONFIGURAÇÃO DE COMUNICAÇÃO COM O BACKEND (RENDER)
    // =========================================================
    const RENDER_BACKEND_URL = "https://anomalia-9fpf.onrender.com";

    // =========================================================
    // UTILITÁRIOS E SEGURANÇA
    // =========================================================
    function escapeHTML(valor) {
        if (valor === null || valor === undefined) return "";
        return String(valor)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatDateNASA(date) {
        return date.toISOString().split("T")[0];
    }

    function formatDateBR(dateString) {
        if (!dateString) return "Data não informada";
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return dateString;
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
        normal: { label: "NORMAL", className: "status-normal" },
        atencao: { label: "ATENÇÃO", className: "status-atencao" },
        anomalia: { label: "ANOMALIA", className: "status-anomalia" },
        alerta: { label: "ALERTA", className: "status-alerta" },
        sem_evidencia: { label: "SEM EVIDÊNCIA", className: "status-sem-evidencia" }
    };

    function badgeStatus(nivel) {
        const config = sinalizacaoConfig[nivel] || sinalizacaoConfig.sem_evidencia;
        return `
            <div class="status-badge ${config.className}">
                <i class="status-dot"></i>
                ${config.label}
            </div>
        `;
    }

    function caixaAlerta(nivel, rotulo, texto, detalhe = "") {
        const config = sinalizacaoConfig[nivel] || sinalizacaoConfig.sem_evidencia;
        return `
            <div class="space-alert-box ${config.className}">
                <div class="space-alert-head">
                    <span class="space-alert-light"></span>
                    <div class="space-alert-level">
                        <small>${escapeHTML(rotulo)}</small>
                        <strong>${config.label}</strong>
                    </div>
                </div>
                <p class="space-alert-text">${escapeHTML(texto)}</p>
                ${detalhe ? `<p class="space-alert-detail">${escapeHTML(detalhe)}</p>` : ""}
            </div>
        `;
    }

    // =========================================================
    // NAVEGAÇÃO DE ABAS
    // =========================================================
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".page-section");

    function abrirAba(tabId) {
        sections.forEach(section => {
            section.classList.remove("active-section");
        });
        const alvo = document.getElementById(tabId);
        if (alvo) {
            alvo.classList.add("active-section");
        }
        navButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.tab === tabId);
        });
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 150);
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            abrirAba(button.dataset.tab);
        });
    });

    // =========================================================
    // ELEMENTOS E CARREGAMENTO DE DADOS (COM TIMEOUT PARA O RENDER)
    // =========================================================
    const neoList = document.getElementById("neo-list");
    const spaceWeatherList = document.getElementById("space-weather-list");
    const spaceSummary = document.getElementById("space-summary");
    const spaceStatus = document.getElementById("space-status");

    async5FetchWithTimeout = async (url, options = {}, timeout = 12000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    async function carregarNEOs() {
        if (!neoList) return;
        neoList.innerHTML = `<div class="space-loading">Consultando NASA NeoWs via Render (o servidor pode demorar até 50s para acordar)...</div>`;

        const hoje = new Date();
        const inicio = formatDateNASA(hoje);
        const fimDate = new Date(hoje);
        fimDate.setDate(fimDate.getDate() + 3);
        const fim = formatDateNASA(fimDate);

        const url = `${RENDER_BACKEND_URL}/api/nasa/neo/rest/v1/feed?start_date=${inicio}&end_date=${fim}`;

        try {
            const response = await async5FetchWithTimeout(url, {}, 25000);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            const objetos = [];
            Object.values(data.near_earth_objects || {}).forEach(lista => {
                lista.forEach(objeto => {
                    const aproximacao = objeto.close_approach_data?.[0];
                    if (!aproximacao) return;
                    objetos.push({
                        id: objeto.id,
                        nome: objeto.name,
                        data: aproximacao.close_approach_date,
                        distancia: Number(aproximacao.miss_distance?.kilometers || 0),
                        diametroMin: objeto.estimated_diameter?.meters?.estimated_diameter_min,
                        diametroMax: objeto.estimated_diameter?.meters?.estimated_diameter_max,
                        perigoso: objeto.is_potentially_hazardous_asteroid === true,
                        velocidade: Number(aproximacao.relative_velocity?.kilometers_per_hour || 0)
                    });
                });
            });

            objetos.sort((a, b) => a.distancia - b.distancia);
            const selecionados = objetos.slice(0, 12);
            window.__anomaliaNEOs = selecionados;
            
            neoList.innerHTML = selecionados.length ? "" : `<div class="space-empty">Nenhum objeto retornado.</div>`;
            selecionados.forEach(objeto => {
                const card = document.createElement("article");
                card.className = `neo-card ${objeto.perigoso ? "status-alerta" : "status-normal"}`;
                card.innerHTML = `
                    <h4>${escapeHTML(objeto.nome)}</h4>
                    <div class="neo-distance">Distância: <strong>${Math.round(objeto.distancia).toLocaleString("pt-BR")} km</strong></div>
                `;
                neoList.appendChild(card);
            });
        } catch (error) {
            console.warn("Erro ao carregar NEOs:", error.message);
            neoList.innerHTML = caixaAlerta("sem_evidencia", "CONEXÃO LENTA OU INDISPONÍVEL", "O backend no Render demorou a responder ou está em hibernação.", error.message);
        }
    }

    async function carregarClimaEspacial() {
        if (!spaceWeatherList) return;
        spaceWeatherList.innerHTML = `<div class="space-loading">Consultando NASA DONKI via Render...</div>`;
        try {
            const hoje = new Date();
            const inicioDate = new Date(hoje);
            inicioDate.setDate(inicioDate.getDate() - 7);
            const url = `${RENDER_BACKEND_URL}/api/nasa/DONKI/FLR?startDate=${formatDateNASA(inicioDate)}&endDate=${formatDateNASA(hoje)}`;
            
            const response = await async5FetchWithTimeout(url, {}, 25000);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const dados = await response.json();

            spaceWeatherList.innerHTML = "";
            if (!dados.length) {
                spaceWeatherList.innerHTML = caixaAlerta("normal", "SEM EVENTOS", "Nenhum evento solar recente registrado.");
                return;
            }

            dados.slice(0, 6).forEach(evento => {
                const card = document.createElement("article");
                card.className = "space-event status-normal";
                card.innerHTML = `<h4>Explosão Solar: ${escapeHTML(evento.classType || "Observada")}</h4><small>${formatDateBR(evento.beginTime)}</small>`;
                spaceWeatherList.appendChild(card);
            });
        } catch (error) {
            console.warn("Erro ao carregar Clima Espacial:", error.message);
            spaceWeatherList.innerHTML = caixaAlerta("sem_evidencia", "FONTE TEMPORARIAMENTE INDISPONÍVEL", "Não foi possível carregar a NASA DONKI neste momento.", error.message);
        }
    }

    async function carregarSnapshot() {
        try {
            const response = await fetch("/data/anomalia.json", { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            await response.json();
        } catch (error) {
            console.warn("Snapshot local indisponível:", error.message);
        }
    }

    carregarSnapshot();
    carregarNEOs();
    carregarClimaEspacial();

    console.log("ANOMALIA: sistema inicializado com correção de carregamento.");
});