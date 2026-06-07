// @ts-check
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";

import { defaultMarkdownProcessor } from "../../lib/markdown";
import remarkSectionize from "../../lib/remark-sectionize";

// https://astro.build/config
export default defineConfig({
    site: "https://writing.sqky.one",
});

export const markdownProcessor = unified({
    ...defaultMarkdownProcessor.options,
    remarkPlugins: [...defaultMarkdownProcessor.options.remarkPlugins, remarkSectionize],
});
