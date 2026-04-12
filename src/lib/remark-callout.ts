import { visit } from "unist-util-visit";

export function remarkCallout() {
  return (tree: any) => {
    visit(tree, "blockquote", (node: any) => {
      if (node.children.length > 0 && node.children[0].type === "paragraph") {
        const paragraph = node.children[0];
        if (
          paragraph.children.length > 0 &&
          paragraph.children[0].type === "text"
        ) {
          const text = paragraph.children[0].value;
          const match = text.match(
            /^\[!(info|warning|danger|success|note)\](.*)/i
          );
          if (match) {
            const type = match[1].toLowerCase();
            let titleText = match[2].trim();

            // Remove the trigger text AND the title from the first child paragraph
            // The `match[0]` contains the full matched string up to the end of the line
            paragraph.children[0].value = text
              .substring(match[0].length)
              .trim();

            // Create attributes array
            const attributes: any[] = [
              {
                type: "mdxJsxAttribute",
                name: "type",
                value: type,
              },
            ];

            // Add title attribute if one was provided
            if (titleText) {
              attributes.push({
                type: "mdxJsxAttribute",
                name: "title",
                value: titleText,
              });
            }

            // Change node to Callout MDX element
            node.type = "mdxJsxFlowElement";
            node.name = "Callout";
            node.attributes = attributes;
          }
        }
      }
    });
  };
}
