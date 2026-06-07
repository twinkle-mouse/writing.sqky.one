import type { Heading, Root } from "mdast";
import type { Node, Parent } from "unist";
import { findAfter } from "unist-util-find-after";
import { visit } from "unist-util-visit";

const MAX_HEADING_DEPTH = 2;

export default function plugin() {
    return transform;
}

function transform(tree: Root) {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
        visit(
            tree,
            (node: Node) => node.type === "heading" && (node as Heading).depth === depth,
            (node, index, parent) => sectionize(node as Heading, index, parent),
        );
    }
}

function sectionize(node: Heading, index: number | undefined, parent: Parent | undefined) {
    if (index === undefined || parent === undefined) return;

    const start = node;
    const startIndex = index;
    const depth = start.depth;

    const end = findAfter(parent, start, (node) => (node.type === "heading" && (node as Heading).depth <= depth) || node.type === "export");
    if (end == undefined) return;

    const endIndex = parent.children.indexOf(end);

    const between = parent.children.slice(startIndex, endIndex > 0 ? endIndex : undefined);

    const section = {
        type: "section",
        depth: depth,
        children: between,
        data: {
            hName: "section",
        },
    };

    parent.children.splice(startIndex, section.children.length, section);
}
