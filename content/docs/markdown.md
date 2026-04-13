---
title: "Markdown Reference"
description:
  "A comprehensive reference of all supported Markdown features in speedrun.md."
---

This page tests all of the typography, MDX components, and markdown features
that we support. It is used to ensure everything renders correctly.

## Callouts

We support Obsidian/GitHub style callouts.

> [!info] Version Differences
> The Shindou version patches the BLJ glitch.

> [!warning] Be careful when performing this skip
> it can corrupt your save file if done incorrectly.

> [!danger] Do not attempt this route unless
> you're goated with the bobby sauce, then you may proceed.

> [!success] New Route Found!
> On 12/04/2026 the community discovered a new any% route.

> [!note] Just a quick note without a custom title.

## Headings

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Typography

This is a paragraph with **bold text**, _italic text_, and ~~strikethrough
text~~. We also support `inline code snippets` inside of regular paragraphs.

Here is a blockquote:

> Speedrunning is the act of playing a video game, or section of a video game,
> with the goal of completing it as fast as possible.

## Lists

### Unordered List

- Frame perfect jump
- BLJ (Backwards Long Jump)
  - Elevator BLJ
  - Stairs BLJ
- Out of Bounds

### Ordered List

1. Enter the level
2. Grab the star
   1. Slide down the slide
   2. Collect 8 red coins
3. Exit

## Code Blocks

Here is a standard code block, highlighting syntax using `rehype-pretty-code`
and the `catppuccin-mocha` theme.

```javascript
// A simple speedrun timer class
class Timer {
  constructor() {
    this.startTime = Date.now();
  }

  getSplit() {
    return Date.now() - this.startTime;
  }
}
```

```python
def calculate_frames(fps=60, seconds=1.5):
    """Calculates total frames for a given time and framerate."""
    return fps * seconds
```

## Tables

| Trick Name     | Difficulty | Time Saved |
| :------------- | :--------: | ---------: |
| LBLJ           |    Hard    |     2m 30s |
| Pillar Glitch  |   Medium   |        15s |
| Moat Door Skip |    Easy    |     1m 00s |

## Media and Links

[Visit the main page](/) [Visit an external site](https://speedrun.com)

Here is a test image:

![Test Image Cover](/images/stress-test.jpg)

## Embeds

We can embed YouTube videos or standard IFrames easily.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## Divider

---

End of test file.
