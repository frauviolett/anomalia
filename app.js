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

    // =========================================================
    // ESPECIAL BRASIL
    // =========================================================
    const brazilSection = document.getElementById("brazil");
    if (brazilSection) {
        brazilSection.innerHTML = `
            <div class="section-heading">
                <div>
                    <span class="section-kicker">ESPECIAL BRASIL</span>
                    <h2>ESPECIAL BRASIL · RADAR DE ANOMALIAS TERRITORIAIS</h2>
                    <div class="brazil-national-risk">
                        <span>ÍNDICE NACIONAL DE ANOMALIA: 58/100</span>
                        <strong>🟧 ANOMALIA MODERADA</strong>
                    </div>
                    <p>Monitoramento contínuo de estresse de biomas, recursos hídricos, atividade geofísica e eventos climáticos nos 26 estados e DF.</p>
                </div>
            </div>
            <div class="brazil-terminal-top">
                <div class="brazil-map-panel">
                    <div class="brazil-panel-head">
                        <div>
                            <span class="panel-kicker">MAPA INTERATIVO</span>
                            <h3>Distribuição territorial dos sinais</h3>
                        </div>
                        <span id="brazil-region-selection">Todas as regiões</span>
                    </div>
                    <div class="brazil-map-stage">
                        <svg class="brazil-map" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa do Brasil dividido em cinco regiões">
                            <path class="brazil-region status-anomalia" data-region="Norte" d="M 80,120 C 120,70 220,50 310,80 C 330,120 310,170 280,190 C 240,210 180,210 140,190 C 100,170 70,140 80,120 Z"><title>Norte - Anomalia</title></path>
                            <path class="brazil-region status-atencao" data-region="Nordeste" d="M 310,80 C 370,60 440,90 450,150 C 430,200 370,210 330,180 C 310,160 300,110 310,80 Z"><title>Nordeste - Atenção</title></path>
                            <path class="brazil-region status-normal" data-region="Centro-Oeste" d="M 180,210 C 250,210 300,200 310,270 C 280,310 200,310 170,270 C 160,240 170,220 180,210 Z"><title>Centro-Oeste - Normal</title></path>
                            <path class="brazil-region status-alerta" data-region="Sudeste" d="M 310,270 C 360,220 420,250 400,320 C 350,360 300,330 290,300 C 290,280 300,270 310,270 Z"><title>Sudeste - Alerta</title></path>
                            <path class="brazil-region status-atencao" data-region="Sul" d="M 200,310 C 270,310 290,320 280,390 C 250,440 210,430 190,380 C 180,340 190,320 200,310 Z"><title>Sul - Atenção</title></path>
                        </svg>
                    </div>
                    <div class="brazil-map-legend">
                        <span><i class="status-dot normal"></i>Normal</span>
                        <span><i class="status-dot atencao"></i>Atenção</span>
                        <span><i class="status-dot anomalia"></i>Anomalia</span>
                        <span><i class="status-dot alerta"></i>Alerta</span>
                    </div>
                </div>
                <aside class="brazil-alerts-panel">
                    <div class="brazil-panel-head">
                        <div>
                            <span class="panel-kicker">PRIORIDADE OPERACIONAL</span>
                            <h3>SINAIS CRÍTICOS EM TEMPO REAL</h3>
                        </div>
                    </div>
                    <article class="brazil-alert-card status-alerta"><time>AGORA · 17:40</time><span class="brazil-alert-badge">🔴 ALERTA</span><strong>Sudeste · estresse hídrico</strong><p>Reservatórios e umidade do solo abaixo da referência em áreas monitoradas.</p><small>Fonte: CEMADEN / ANA</small></article>
                    <article class="brazil-alert-card status-anomalia"><time>AGORA · 17:34</time><span class="brazil-alert-badge">🟧 ANOMALIA</span><strong>Norte · pressão sobre biomas</strong><p>Focos de calor e perda de umidade ampliam a janela de propagação de queimadas.</p><small>Fonte: INPE / CEMADEN</small></article>
                    <article class="brazil-alert-card status-atencao"><time>HOJE · 17:21</time><span class="brazil-alert-badge">🟡 ATENÇÃO</span><strong>Sul · variância climática</strong><p>Oscilações de temperatura e chuva alteram o padrão regional recente.</p><small>Fonte: INMET</small></article>
                </aside>
            </div>
            <div class="brazil-region-grid">
                <article class="brazil-region-card status-anomalia" data-region-card="Norte"><header><h3>Norte</h3><span>🟧 Anomalia</span></header><strong class="brazil-metric">Déficit Hídrico: -31%</strong><p>Baixa umidade do solo favorecendo gatilhos de queimada rápida e estresse de biomas.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article>
                <article class="brazil-region-card status-atencao" data-region-card="Nordeste"><header><h3>Nordeste</h3><span>🟡 Atenção</span></header><strong class="brazil-metric">Variância Térmica: +2.8 °C</strong><p>Persistência de calor e baixa precipitação pressionam sistemas agrícolas e hídricos.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article>
                <article class="brazil-region-card status-normal" data-region-card="Centro-Oeste"><header><h3>Centro-Oeste</h3><span>🟢 Normal</span></header><strong class="brazil-metric">Umidade do Solo: dentro da base</strong><p>Leituras ambientais estáveis, com variações localizadas sob observação regular.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article>
                <article class="brazil-region-card status-alerta" data-region-card="Sudeste"><header><h3>Sudeste</h3><span>🔴 Alerta</span></header><strong class="brazil-metric">Reservatórios: -22%</strong><p>Déficit acumulado elevando a vulnerabilidade de abastecimento em bacias críticas.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article>
                <article class="brazil-region-card status-atencao" data-region-card="Sul"><header><h3>Sul</h3><span>🟡 Atenção</span></header><strong class="brazil-metric">Chuva acumulada: +18%</strong><p>Oscilação pluviométrica aumenta a necessidade de monitorar cheias e deslizamentos.</p><footer>Fontes: INPE / CEMADEN / ANA</footer></article>
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
    // INICIALIZAÇÃO DE DADOS E EVENTOS GLOBAIS
    // =========================================================
    async function carregarSnapshot() {
        try {
            const response = await fetch("/data/anomalia.json", { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const dados = await response.json();
            console.log("Snapshot carregado com sucesso:", dados);
        } catch (error) {
            console.warn("Aviso ao carregar snapshot local:", error.message);
        }
    }

    carregarSnapshot();
    console.log("ANOMALIA: sistema inicializado com segurança.");
});