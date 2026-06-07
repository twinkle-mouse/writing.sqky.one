import { unified } from "@astrojs/markdown-remark";
import remarkBreaks from "remark-breaks";

import remarkPreserveConsecutiveBlankLines from "./remark-preserve-consecutive-blank-lines";

export const defaultMarkdownProcessor = unified({ smartypants: false, remarkPlugins: [remarkPreserveConsecutiveBlankLines, remarkBreaks] });
