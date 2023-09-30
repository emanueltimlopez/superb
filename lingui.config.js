/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["en", "es"],
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["screens", "lib", "components", "./App.tsx"],
    },
  ],
  format: "po",
};