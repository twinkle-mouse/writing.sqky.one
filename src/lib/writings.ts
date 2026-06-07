import { getContainerRenderer } from "@astrojs/mdx";
import { count } from "@wordpress/wordcount";
import { experimental_AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { loadRenderers } from "astro:container";

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });

export const siteName = "Stardew Library";
export const siteDesc =
    "Stories of the stars in your heart, lyrics of the twinkles in your eyes — Inherit the earth like it was meant to be, welcome to the Stardew Library 💖";

export async function countWords(Content: AstroComponentFactory) {
    const body = await container.renderToString(Content);

    return count(body, "words", {});
}
