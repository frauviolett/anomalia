# ANOMALIA

## Radar de Anomalias

O ANOMALIA é um projeto experimental para monitorar dados públicos e tentar identificar comportamentos fora do padrão.

A proposta não é prever catástrofes.

A proposta é:

> DADOS ANTES DA ESPECULAÇÃO.

---

# Módulos atuais

## 🌎 PLANETA

### Terremotos

Fonte:

USGS

O sistema apresenta:

- mapa mundial;
- quantidade de terremotos;
- magnitude máxima;
- período selecionável;
- magnitude mínima;
- localização dos eventos.

Importante:

Quantidade de terremotos não significa automaticamente que existe uma anomalia.

A próxima etapa deverá implementar uma comparação histórica adequada.

---

## 🌊 OCEANOS

Fonte:

Open-Meteo Marine API.

Atualmente apresenta:

- temperatura da superfície;
- altura das ondas;
- velocidade das correntes;
- horário da atualização.

---

# ☀️ ESPAÇO

## Atividade solar

Fonte:

NASA DONKI.

Apresenta eventos de flares solares recentes.

---

## Objetos próximos da Terra

Fonte:

NASA NeoWs.

Apresenta:

- objetos próximos;
- data da aproximação;
- distância;
- classificação de potencialmente perigoso.

Importante:

Um objeto potencialmente perigoso não significa que esteja em rota de colisão com a Terra.

---

# 🤖 INTELIGÊNCIA ARTIFICIAL

## AI Incident Database

O projeto utiliza o AI Incident Database como fonte de incidentes documentados envolvendo sistemas de inteligência artificial.

A ideia não é afirmar:

"IA está atacando humanos."

A ideia é observar:

- incidentes;
- falhas;
- acidentes;
- abuso;
- problemas de segurança;
- comportamento inesperado;
- outros eventos documentados.

---

# 📰 CLIPPING

O clipping utiliza GDELT para descoberta de notícias.

A quantidade exibida é deliberadamente limitada a:

10 notícias.

A regra editorial é:

> NOTÍCIA É SINAL. NÃO É EVIDÊNCIA.

Uma manchete não deve automaticamente transformar-se em uma anomalia.

---

# Metodologia futura

O objetivo do ANOMALIA é evoluir para:

DADO

↓

BASELINE

↓

DESVIO

↓

CONTEXTO

↓

ANÁLISE

↓

CONCLUSÃO

Por exemplo:

"Existem 850 terremotos."

não significa:

"Existe uma anomalia."

O sistema precisa perguntar:

850 é muito?

Muito comparado a quê?

Qual região?

Qual magnitude?

Qual período?

Existe histórico?

Existe agrupamento?

Existe algum evento tectônico conhecido?

Somente depois disso podemos classificar o comportamento.

---

# Princípio editorial

O ANOMALIA não deve fazer previsões sem evidência.

Não devemos transformar:

"Existe possibilidade de..."

em:

"Vai acontecer."

---

# Tecnologias

HTML

CSS

JavaScript

Leaflet

APIs públicas

---

# Execução

Abrir o projeto no Visual Studio Code.

Instalar/extensão:

Live Server

Depois:

Clique com botão direito em:

index.html

e selecione:

Open with Live Server

---

# Observação

Algumas APIs podem bloquear chamadas diretamente do navegador por CORS ou limites de requisição.

Isso não significa necessariamente que a fonte esteja indisponível.

Para uma versão de produção, poderemos utilizar:

- cache;
- snapshots;
- RSS;
- Cloudflare Workers;
- funções serverless;
- ou outro intermediário extremamente simples.

A intenção é continuar evitando um backend complexo.
