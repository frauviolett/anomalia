ANOMALIA — JavaScript MVP 2.0

Estrutura:
index.html
css/style.css
js/app.js

APIs / fontes públicas usadas no navegador:
- USGS Earthquake Catalog: https://earthquake.usgs.gov/fdsnws/event/1/
- NOAA/NCEI OISST via ERDDAP: https://www.ncei.noaa.gov/erddap/
- NOAA CPC RONI: https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/roni/
- OpenStreetMap tiles via Leaflet
- NASA DONKI: https://api.nasa.gov/DONKI/
- NASA NeoWs: https://api.nasa.gov/neo/rest/v1/
- GDELT DOC 2.0: https://api.gdeltproject.org/api/v2/doc/doc
- AI Incident Database GraphQL: https://incidentdatabase.ai/api/graphql

Importante:
1. O projeto é frontend-only. Algumas APIs podem limitar CORS, taxa de requisições ou uso de DEMO_KEY.
2. Terremotos: o sistema compara a janela atual com 12 janelas equivalentes dos anos anteriores. Isso é um indicador global de triagem, não uma previsão regional.
3. Oceanos: usa diretamente o campo de anomalia SST da NOAA OISST; portanto não exibe temperatura absoluta como se fosse anomalia.
4. A tag 🌡️ MUDANÇAS CLIMÁTICAS GLOBAIS é apenas contexto e não atribui causalidade a um evento local.
5. Notícias são clipping/sinal de descoberta. Não são tratadas como prova.
6. NASA DEMO_KEY é para demonstração e pode atingir limite; para produção deve ser substituída por uma chave própria conforme as condições da NASA.

Para visualizar:
Abra index.html com Live Server no VS Code.
