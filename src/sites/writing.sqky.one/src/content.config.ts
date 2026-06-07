import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

import { collections as parent } from "$content.config";

const ROOT = "./src/sites/writing.sqky.one";

const writings = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `${ROOT}/src/entries/writings` }),
    schema: z.object({
        title: z.string(),
        description: z.string().nullable().default(null),
        date: z.coerce.date(),
        authors: z.array(z.string()).default(["Stella Sparkles"]),
        tags: z.array(z.string()).default([]),
        relations: z.record(z.string(), z.string()).default({}),
        wip: z.boolean().default(false),
    }),
});

const notes = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: `${ROOT}/src/entries/notes` }),
    schema: z.object({
        title: z.string(),
        relations: z.record(z.string(), z.string()).default({}),
    }),
});

export const collections = { writings, notes, ...parent };
