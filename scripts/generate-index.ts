import {
  generateSearchIndex,
  saveSearchIndex,
  generateTagIndex,
  saveTagIndex,
} from "../src/lib/search";

async function build() {
  console.log("Generating search index...");
  const searchIndex = await generateSearchIndex();
  saveSearchIndex(searchIndex);
  console.log(`Search index saved with ${searchIndex.length} items.`);

  console.log("Generating tag index...");
  const tagIndex = await generateTagIndex();
  saveTagIndex(tagIndex);
  console.log(`Tag index saved with ${tagIndex.length} tags.`);
}

build().catch(console.error);
