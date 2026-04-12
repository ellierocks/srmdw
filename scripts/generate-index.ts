import { generateSearchIndex, saveSearchIndex } from "../src/lib/search";

async function build() {
  console.log("Generating search index...");
  const index = await generateSearchIndex();
  saveSearchIndex(index);
  console.log(`Search index saved with ${index.length} items.`);
}

build().catch(console.error);
