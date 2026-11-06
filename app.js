document.addEventListener("DOMContentLoaded", () => {
    console.log("ANOMALIA iniciado com segurança de rede.");

    const RENDER_BACKEND_URL = "https://anomalia-9fpf.onrender.com";

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

    const sinalizacaoConfig = {
        normal: { label: "NORMAL", className: "status-normal" },
        atencao: { label: "ATENÇÃO", className: "status-atencao" },
        anomalia: { label: "ANOMALIA", className: "status-anomalia" },
        alerta: { label: "ALERTA", className: "status-alerta" },
        sem_evidencia: { label: "SEM EVIDÊNCIA", className: "status-sem-evidencia" }
    };

    function caixaAlerta(nivel, rotulo, texto, detalhe = "") {
        const config = sinalizacaoConfig[nivel] || sinalizacaoConfig.sem_evidencia;
        return `
            <div class="space-alert-box ${config.className}" style="padding: 20px; text-align: center; margin: 15px 0; border-radius: 8px; background: rgba(255,0,0,0.05);">
                <div class="space-alert-level">
                    <small style="font-weight: bold; color: #d9534f;">${escapeHTML(rotulo)}</small>
                    <strong>${config.label}</strong>
                </div>
                <p class="space-alert-text" style="margin-top: 8px;">${escapeHTML(texto)}</p>
                ${detalhe ? `<p class="space-alert-detail" style="font-size: 0.85rem; opacity: 0.8; margin-top: 4px;">${escapeHTML(detalhe)}</p>` : ""}
            </div>
        `;
    }

    // Abas
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".page-section");

    function abrirAba(tabId) {
        sections.forEach(sec => sec.classList.remove("active-section"));
        const alvo = document.getElementById(tabId);
        if (alvo) alvo.classList.add("active-section");
        navButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabId));
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => abrirAba(button.dataset.tab));
    });

    // Carregamento seguro de NEOs com dados estáticos de fallback caso a NASA falhe
    const neoList = document.getElementById("neo-list");

    async function carregarNEOs() {
        if (!neoList) return;
        neoList.innerHTML = `<div style="text-align:padding:20px;">A consultar telemetria orbital via Render...</div>`;

        const hoje = new Date();
        const inicio = formatDateNASA(hoje);
        const fimDate = new Date(hoje);
        fimDate.setDate(fimDate.getDate() + 3);
        const fim = formatDateNASA(fimDate);

        const url = `${RENDER_BACKEND_URL}/api/nasa/neo/rest/v1/feed?start_date=${inicio}&end_date=${fim}`;

        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const data = await response.json();
            
            const objetos = [];
            Object.values(data.near_earth_objects || {}).forEach(lista => {
                lista.forEach(objeto => {
                    const aprox = objeto.close_approach_data?.[0];
                    if (!aprox) return;
                    objetos.path && objetos.push({
                        nome: objeto.name,
                        distancia: Number(aprox.miss_distance?.kilometers || 0),
                        perigoso: objeto.is_potentially_hazardous_asteroid === true
                    });
                });
            });

            neoList.innerHTML = "";
            if(objetos.length === 0) throw new Error("Nenhum objeto retornado pela API.");

            objetos.slice(0, 6).forEach(obj => {
                const card = document.createElement("article");
                card.className = `neo-card ${obj.perigoso ? "status-alerta" : "status-normal"}`;
                card.innerHTML = `<h4>${escapeHTML(obj.nome)}</h4><p>Distância: ${Math.round(obj.distancia).toLocaleString("pt-BR")} km</p>`;
                neoList.appendChild(card);
            });

        } catch (error) {
            console.warn("Falha na API da NASA/Render, ativando modo de resguardo:", error.message);
            // Fallback visual para o painel não ficar quebrado ou vazio
            neoList.innerHTML = caixaAlerta(
                "atencao", 
                "MODO DE CONTENÇÃO ATIVO", 
                "A API da NASA está temporariamente instável (HTTP 502 ou bloqueio de rede).", 
                error.message
            );
        }
    }

    carregarNEOs();
});