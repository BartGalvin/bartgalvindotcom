# My portfolio

A small, single-page React site with Vite and Tailwind CSS. Content lives in
`src/content.js`. Page components live in `src/components/`. `src/App.jsx`
assembles those components in page order.

Run `npm run dev` for local previews. Graphite/cobalt is the default; append
`?theme=oxblood` for the warmer palette or `?theme=graphite` for cobalt. These
URL overrides only run in development.

`SkillList` keeps colored badges as its default presentation. Use
`variant="text"` for the plain labels shown in the current layout.
