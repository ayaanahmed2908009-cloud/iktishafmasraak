---
name: Landing partner logo sizing
description: Why matching CSS height doesn't equalize the نهج/مسك logo visual sizes, and how to fix
---

# Partner logo visual sizing (نهج vs مسك)

The colored نهج logo asset shipped with huge transparent padding — its visible content occupied only ~38% of the canvas (e.g. 724x342 inside a 1920x1080 PNG). The مسك asset fills nearly its whole canvas. Both logos render with `h-… w-auto object-contain`, which is height-constrained on the *bounding box including padding*.

**Why:** because the نهج bounding box was mostly empty space, matching its CSS height to مسك made the visible mark appear much smaller — bumping the height class repeatedly never fixed it.

**How to apply:** to make two logos appear equal size, trim each to its alpha bounding box first, then give them the same height class. Trim with PIL: `Image.open(p).convert('RGBA').crop(img.getbbox())`. After trimming, both نهج and مسك have aspect ~2.0, so equal `h-…` => equal visual size. The trimmed نهج is imported in home.tsx and reused by both the partner section and the footer. Verify rendered sizes with the testing tool (scroll past the `h-[100dvh]` hero — plain app_preview screenshots can't reach sections below the hero).
