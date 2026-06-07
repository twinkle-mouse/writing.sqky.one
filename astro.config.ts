export class Site {
    static SqkyOne = "Main_SqkyOne";
    static TheSqkyOne = "Files_SqkyOne";
    static WritingSqkyOne = "Writing_SqkyOne";
}
export const site = process.env["SITE_CONFIG"] || Site.SqkyOne;

import path from "node:path";

import mdx from "@astrojs/mdx";
import { defineConfig, fontProviders } from "astro/config";
import compressor from "astro-compressor";
import icon from "astro-icon";

import cfg_sqky_one, { markdownProcessor as md_sqky_one } from "./src/sites/sqky.one/astro.config";
import cfg_the_sqky_one, { markdownProcessor as md_the_sqky_one } from "./src/sites/the.sqky.one/astro.config";
import cfg_writing_sqky_one, { markdownProcessor as md_writing_sqky_one } from "./src/sites/writing.sqky.one/astro.config";

const dir = process.cwd();
const fontsDir = path.join(dir, "fonts");
const sitesDir = path.join(dir, "src", "sites");

let config = undefined;
let markdownProcessor = undefined;

if (site === Site.SqkyOne) {
    config = { ...cfg_sqky_one, srcDir: path.join(sitesDir, "sqky.one", "src") };
    markdownProcessor = md_sqky_one;
}
if (site === Site.WritingSqkyOne) {
    config = { ...cfg_writing_sqky_one, srcDir: path.join(sitesDir, "writing.sqky.one", "src") };
    markdownProcessor = md_the_sqky_one;
}
if (site === Site.TheSqkyOne) {
    config = { ...cfg_the_sqky_one, srcDir: path.join(sitesDir, "the.sqky.one", "src") };
    markdownProcessor = md_writing_sqky_one;
}

if (config == undefined || markdownProcessor == undefined) {
    throw new Error(`Invalid site selection: ${site}`);
}

const IosevkaWeights = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Heavy",
};

const IosevkaStyles = {
    normal: "",
    italic: "Italic",
};

type Source =
    | string
    | URL
    | {
          url: string | URL;
          tech?: string | undefined;
      };

type Variant = {
    src: [Source, ...Source[]];
    style: "normal" | "italic" | "oblique" | undefined;
    weight: string;
};

function IosevkaFixedCurlyVariants(): [Variant, ...Variant[]] {
    return Object.entries(IosevkaWeights).flatMap(([weight, weightName]) => {
        return Object.entries(IosevkaStyles).map(([style, styleName]) => {
            return {
                src: [fontsDir + `/IosevkaFixedCurly/WOFF2/IosevkaFixedCurly-${weightName}${styleName}.woff2`] as [Source, ...Source[]],
                style,
                weight,
            };
        });
    }) as [Variant, ...Variant[]];
}

export default defineConfig({
    ...config,

    devToolbar: {
        enabled: false,
    },

    i18n: undefined,

    build: {
        inlineStylesheets: "always",
    },

    vite: {
        css: {
            transformer: "postcss",
        },
        cacheDir: path.join(dir, "node_modules", ".vite"),
    },

    markdown: {
        ...(config.markdown || {}),
        processor: markdownProcessor,
    },

    integrations: [
        ...(config.integrations || []),
        mdx({}),
        icon({
            iconDir: "./icons",
        }),
        compressor(),
    ],

    fonts: [
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "noseyrodent",
            cssVariable: "--font-noseyrodent",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/noseyrodent/noseyrodent-Regular.woff2"],
                        weight: 400,
                    },
                    {
                        style: "normal",
                        src: [fontsDir + "/noseyrodent/noseyrodent-Bold.woff2"],
                        weight: 700,
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "Besley",
            cssVariable: "--font-besley",
            options: {
                variants: [
                    {
                        style: "normal",
                        src: [fontsDir + "/Besley/Besley-VariableFont_wght.ttf"],
                        weight: 400,
                    },
                    {
                        style: "italic",
                        src: [fontsDir + "/Besley/Besley-Italic-VariableFont_wght.ttf"],
                        weight: 400,
                    },
                ],
            },
        },
        {
            fallbacks: [],
            provider: fontProviders.local(),
            name: "Iosevka Fixed Curly",
            cssVariable: "--font-iosevka-curly",
            options: {
                variants: IosevkaFixedCurlyVariants(),
            },
        },
    ],
});
