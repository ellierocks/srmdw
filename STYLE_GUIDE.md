# Frontend Style Guidelines

## Design Philosophy

Sharp, minimal UI. No rounding. No gradients on large areas. Catppuccin palette
with purposeful color use per semantic meaning.

## Typography

- **Font weight**: Black (900) for headings, Bold (700) for emphasis
- **Tracking**: Tight (`tracking-tighter`) for headings, normal for body
- **Sizes**: Use scale consistently — `text-xs` (12px), `text-sm` (14px),
  `text-base` (16px), `text-xl` (20px), `text-4xl` (36px+)

## Color Usage

Catppuccin semantic mapping:

| Color           | Use                                   |
| --------------- | ------------------------------------- |
| `text-mauve`    | Primary actions, links, active states |
| `text-lavender` | Developer metadata                    |
| `text-sapphire` | Publisher metadata                    |
| `text-sky`      | Release date metadata                 |
| `text-teal`     | Platform metadata                     |
| `text-blue`     | Info callouts, articles icon          |
| `text-green`    | Success states                        |
| `text-yellow`   | Warning states                        |
| `text-red`      | Danger/error states                   |

## Spacing

- **Padding**: Use consistent scale — `p-4` (16px), `p-6` (24px), `p-8` (32px)
- **Gaps**: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- **Section spacing**: `space-y-24` or `space-y-32` between major sections

## Borders

- **Width**: `border` (1px default), `border-2` for emphasis
- **Color**: `border-surface1` for subtle, `border-surface2` for visible
- **Never use**: `rounded-*` classes

## Shadows

- **Elevation**: `shadow-2xl` for floating elements
- **Glow**: `shadow-mauve/20` for hover states on mauve elements
- **Never use**: gradient backgrounds for large areas

## Components

### Buttons

- Use `border border-surface1` as base
- `hover:border-mauve` for interactive states
- `bg-surface0` or `bg-mantle` for background
- No rounding — keep sharp corners

### Cards

- `bg-mantle/50` or `bg-surface0` background
- `border border-surface1` border
- `hover:border-mauve` on interaction
- `p-6` or `p-8` padding

### Inputs

- `bg-surface0` background
- `border border-surface1` border
- `focus:border-mauve` for focus state
- No rounding

### Callouts

- `border-l-4` for left border accent
- Use semantic colors per callout type:
  - Info: `border-blue bg-blue/10`
  - Warning: `border-yellow bg-yellow/10`
  - Danger: `border-red bg-red/10`
  - Success: `border-green bg-green/10`
  - Note: `border-lavender bg-lavender/10`

## Motion

- **Duration**: 0.2s–0.35s for micro-interactions
- **Easing**: `cubic-bezier(0.19, 1, 0.22, 1)` for exits
- **Page transitions**: Framer-motion via `template.tsx`
- **Hover**: `transition-all` for smooth state changes

## Icons

- **Size**: 14px–18px for inline, 24px+ for standalone
- **Colors**: Use semantic mapping from palette
- **Stroke**: Default 2px stroke from Lucide

## Scrollbar

- Hide with `scrollbar-hide` on sidebar/content areas
- Custom scrollbar styling via Tailwind

## Text Selection

- Use `::selection` for custom highlight colors

## Anti-patterns

- No `rounded-*` on any element
- No `bg-gradient-to-*` for large background areas
- No `shadow-lg` (use `shadow-2xl` or specific glow instead)
- No inline styles for colors
