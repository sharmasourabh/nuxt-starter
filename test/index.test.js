import test from "ava";
import { resolve } from "path";
import { Nuxt, Builder } from "nuxt";
import { JSDOM } from "jsdom";
//import { root } from "postcss";

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null;

// Init Nuxt.js and create a server listening on localhost:4000
test.before(
  "Init Nuxt.js",
  async () => {
    const rootDir = resolve(__dirname, "..");
    let config = {};
    try {
      config = require(resolve(rootDir, "nuxt.config.js"));
    } catch (e) {
      console.error(e);
    }
    config.dev = false;
    config.rootDir = rootDir;

    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.server.listen(4000, "localhost");
  },
  30000
);

// Example of testing only generated html
test("Route / exits and render HTML", async t => {
  const context = {};
  const { html } = await nuxt.server.renderRoute("/", context);
  t.true(html.includes('<h1 class="title">Nuxt Auth</h1>'));
});

// Example of testing via dom checking
test("Route / exits and render HTML with CSS applied", async t => {
  const context = {};
  const { html } = await nuxt.server.renderRoute("/", context);
  const { window } = new JSDOM(html).window;
  const element = window.document.querySelector(".title");
  t.not(element, null);
  t.is(element.textContent, "NUXTS");
  t.is(element.className, "v-toolbar__title title");
  t.is(window.getComputedStyle(element).fontFamily, "Roboto,sans-serif");
  t.log(JSON.stringify(element));
});

// Close server and ask nuxt to stop listening to file changes
// eslint-disable-next-line no-unused-vars
test.after("Closing server and nuxt.js", t => {
  nuxt.close();
});
