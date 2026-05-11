# Stadhuisbericht

Bron van de maandelijkse nieuwsbrief van Lokale Lobby. Je schrijft een editie in Markdown, pusht naar GitHub, en de site wordt automatisch gebouwd en gepubliceerd op `https://stadhuisbericht.lokale-lobby.nl`.

## Hoe het werkt

Drie lagen:

1. **Schrijven**: je werkt in `src/edities/` aan Markdown-bestanden. Een sjabloon staat klaar in `templates/nieuwe-editie-sjabloon.md`.
2. **Bouwen**: GitHub bouwt automatisch een statische site uit je Markdown wanneer je pusht. Geen handmatige stap nodig.
3. **Versturen**: je deelt de URL van elke editie via WhatsApp, e-mail, of via een korte MailerLite-aankondiging.

## Een nieuwe editie schrijven

1. Kopieer `templates/nieuwe-editie-sjabloon.md` naar `src/edities/` en hernoem naar de juiste maand. Bijvoorbeeld `2026-06.md`.
2. Vul de YAML-velden in tussen de `---` streepjes:
   - `titel`: "Juni 2026"
   - `editie`: oplopend nummer (2, 3, 4, ...)
   - `datum`: ISO-formaat, bijvoorbeeld `2026-06-02`
   - `preheader`: de teaser die in WhatsApp-previews en e-mail verschijnt
   - De vier rubrieken en de PS
3. Commit en push. Binnen 1-2 minuten staat de editie live op `https://stadhuisbericht.lokale-lobby.nl/2026-06/`.

Opmaak in tekstvelden: HTML mag (`<strong>`, `<em>`, `<a href="...">`). Voor lijsten gebruik je de `items:` syntax.

## Eenmalige setup

### Stap 1: Repo op GitHub

1. Maak een nieuw publiek of privaat repository aan op GitHub, bijvoorbeeld `lokale-lobby/stadhuisbericht`.
2. Push de inhoud van deze map naar de `main` branch.
3. Ga naar **Settings → Pages**. Onder **Source** kies je **GitHub Actions**.

### Stap 2: Subdomein koppelen

Optie A (aanbevolen): **Cloudflare Pages**. Sneller, betere caching, custom domain trivial.

1. Maak een gratis Cloudflare-account.
2. **Workers & Pages → Create → Pages → Connect to Git**, kies je GitHub-repo.
3. Build settings: build command `npm run build`, output directory `_site`.
4. Onder **Custom domains** voeg je `stadhuisbericht.lokale-lobby.nl` toe.
5. Bij **mijn.host** (jouw DNS-host) maak je een CNAME aan: `stadhuisbericht` → `<projectnaam>.pages.dev` (Cloudflare geeft de exacte waarde).

Optie B: **GitHub Pages**. Iets eenvoudiger, geen extra account nodig.

1. In je repo: **Settings → Pages → Custom domain** → `stadhuisbericht.lokale-lobby.nl`.
2. Bij **mijn.host** maak je een CNAME aan: `stadhuisbericht` → `<github-username>.github.io`.

### Stap 3: Open Graph plaatje

Voor de WhatsApp/LinkedIn-preview moet er een afbeelding zijn op `/assets/og-default.png`. Aanbevolen: een eenmalige merkkaart van 1200×630 pixels met logo + "Stadhuisbericht" + tagline. Zet die als `src/assets/og-default.png` in de repo.

### Stap 4: MailerLite

1. Maak een MailerLite-account (Free plan is voldoende: 1000 contacten, 12.000 mails/maand).
2. Voor de aankondigingsmail bouw je één keer een sjabloon in de drag-and-drop editor:
   - Korte intro: "Beste lezer, een nieuwe editie van Stadhuisbericht staat online."
   - Knop: "Lees online" → linkt naar de editie-URL
   - Footer met uitschrijflink (verplicht in MailerLite)
3. Voor elke nieuwe editie duplicate je het sjabloon en pas je de link aan.

## Lokaal draaien (optioneel)

Wil je een editie eerst zien voordat je pusht? In de terminal:

```
npm install
npm start
```

Open `http://localhost:8080` in je browser. De site bouwt automatisch opnieuw als je een bestand opslaat.

## Mappenstructuur

```
stadhuisbericht/
├── src/
│   ├── edities/              je nieuwsbrieven in Markdown
│   │   ├── 2026-05.md
│   │   └── edities.json      gedeelde instellingen voor alle edities
│   ├── _includes/layouts/    HTML-templates
│   ├── _data/site.json       globale site-info (naam, URL, afzender)
│   ├── assets/styles.css     de Stadhuisbericht-vormgeving
│   └── index.njk             overzichtspagina met alle edities
├── templates/
│   └── nieuwe-editie-sjabloon.md
├── .github/workflows/        auto-deploy
└── _site/                    de gebouwde site (niet in Git)
```

## Wat als ik later wil verhuizen

Alle content is Markdown in jouw eigen GitHub-repo. Je bent niet vast aan Eleventy, niet aan Cloudflare, niet aan MailerLite. Je kunt op elk moment overstappen door de Markdown ergens anders in te laden.
