# Julies julekalender

1. Udpak projektet i din mappe. Åbn den i VS Code.
2. Installer Node.js (LTS). Kør `npx netlify-cli dev` i projektmappen for lokal test.
3. Upload projektet til et privat Git-repository og forbind det med Netlify, eller kør `npx netlify-cli deploy --prod` og følg login/setup. Publish directory: public. Functions: netlify/functions. Brug ikke kun drag-and-drop af public, da funktionerne er nødvendige.
4. Rediger teksterne i netlify/functions/calendar.mjs. Kalenderen åbner 1.–24. december 2026 ved midnat dansk tid. Tidligere låger forbliver åbne.
5. Til test kan du midlertidigt ændre `unlocked` i funktionen til 24 (kun lokalt); gendan inden deployment.
6. Medier: opret public/media og tilføj filer. Tilføj et tredje element til en låge, fx `{type:'image',url:'/media/os.jpg'}`. Typer: image, video, audio, link. Filer i public er offentlige og kan tilgås direkte, også før lågens dato. Brug ikke følsomme/private medier uden separat adgangsbeskyttelse.

Ingen login: alle med URL kan besøge siden. Noindex er ikke adgangsbeskyttelse. Serveren kontrollerer datolås for tekster, men ikke offentlige medier. Hold repository privat, og brug adgangsbeskyttelse på hosting hvis reel privathed er vigtig.
