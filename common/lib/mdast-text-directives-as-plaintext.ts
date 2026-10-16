import { defineMdastPlugin, type MdastNode, type MdastVisitorContext } from "satteri";

type TextDirective = Extract<MdastNode, { type: "textDirective" }>;

export default function plugin() {
    return defineMdastPlugin({
        name: "text-directives-as-plaintext",
        textDirective: (node: Readonly<TextDirective>, ctx: MdastVisitorContext) => {
            ctx.replaceNode(node, { type: "text", value: ":" + node.name });
        },
    });
}
