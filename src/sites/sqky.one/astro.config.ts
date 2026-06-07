// @ts-check
import { defineConfig } from "astro/config";

import { defaultMarkdownProcessor } from "../../lib/markdown";

// https://astro.build/config
export default defineConfig({
    site: "https://sqky.one",
});

export const markdownProcessor = defaultMarkdownProcessor;
