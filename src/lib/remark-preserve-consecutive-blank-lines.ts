import type { Paragraph, Root } from "mdast";
import type { Node, Parent } from "unist";
import { findBefore } from "unist-util-find-before";
import { visit } from "unist-util-visit";

export default function plugin() {
    return transform;
}

function transform(tree: Root) {
    visit(tree, () => true, preserve);
}

function preserve(node: Node, index: number | undefined, parent: Parent | undefined) {
    if (index === undefined || parent === undefined) return;

    const currentLine = node.position?.start.line;
    if (currentLine === undefined) return;

    const prevParagraph = findBefore(parent, node, () => true);
    if (prevParagraph === undefined) return;

    const prevLine = prevParagraph.position?.end.line;
    if (prevLine === undefined) return;

    const prevIndex = parent.children.indexOf(prevParagraph);

    const diff = Math.floor((currentLine - prevLine - 2) / 2);
    if (diff > 0) {
        const toAdd = [];

        for (let i = 0; i < diff; i++) {
            const p: Paragraph = {
                type: "paragraph",
                children: [{ type: "text", value: "​" }],
            };

            toAdd.push(p);
        }

        parent.children.splice(prevIndex + 1, 0, ...toAdd);
    }
}
