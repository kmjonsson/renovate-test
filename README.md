# renovate-testing

Ett litet npm/Node.js-exempelprojekt för att testa [Renovate](https://docs.renovatebot.com/) och se hur det skapar
pull requests för beroendeuppdateringar.

## Innehåll

- [`index.js`](index.js) – en minimal Express-app som använder `lodash` och `chalk`.
- [`package.json`](package.json) – innehåller medvetet lite äldre versioner av beroendena
  (`express`, `chalk`, `lodash`, `nodemon`) så att Renovate har uppdateringar att föreslå.
- [`renovate.json`](renovate.json) – Renovate-konfiguration.

## Köra appen

```bash
npm install
npm start
```

Öppna sedan http://localhost:3000.

## Testa Renovate

### Alternativ 1: Renovate CLI lokalt

```bash
git init          # Renovate --platform=local behöver ett Git-repo för att skriva ändringar
git add -A && git commit -m "init"
npx renovate --platform=local
```

Detta kör Renovate mot arbetskatalogen utan att behöva GitHub/GitLab och listar/skriver
vilka uppdateringar den hittar. Utan ett Git-repo körs bara beroende-extraktionen (verifierar
att `renovate.json` och `package.json` tolkas korrekt) men inga filer skrivs.

### Alternativ 2: Via GitHub

1. Skapa ett repo på GitHub och pusha upp innehållet i den här mappen.
2. Installera [Renovate-appen](https://github.com/apps/renovate) på repot (eller aktivera
   Renovate/Mend-integrationen om ni använder self-hosted GitHub/GitLab).
3. Renovate hittar `renovate.json`, skapar en initial "Configure Renovate"-PR, och därefter
   PRs för varje utdaterat beroende enligt schemat i `renovate.json`.

## Om `renovate.json`

- `extends: ["config:recommended"]` – använder Renovates rekommenderade grundinställningar.
- `schedule` – kör bara uppdateringar natt mot måndag (Europe/Stockholm-tid).
- `packageRules` – auto-mergar minor/patch-uppdateringar men kräver manuell granskning av
  major-uppdateringar.
- `lockFileMaintenance` – håller `package-lock.json` uppdaterad även när inga
  `package.json`-versioner ändras.

Justera reglerna efter behov – det här är bara ett exempel att utgå från.
