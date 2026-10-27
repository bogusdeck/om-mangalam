# Section 3: The Bride and The Groom — Madhubani Folk-Art Assets

This directory houses the drop-in assets for Section 3 (Meet the Couple).
All assets are managed through the `ART` configuration object located at the top of `src/components/MeetCouple.jsx`.

## Expected Files & Specifications

| Asset Key in `ART` | Expected Filename | Recommended Size / Aspect Ratio | Description |
| :--- | :--- | :--- | :--- |
| `archFrame` | `/assets/s3/arch-frame.png` | 1792 x 2400 (3:4 aspect ratio) | Decorative Madhubani arch frame with transparent cutout window. |
| `ribbonPlate` | `/assets/s3/ribbon-plate.png` | 1024 x 205 (~5:1 aspect ratio) | Cream banner plate with swallowtail ribbons for Bride/Groom names. |
| `centreMedallion` | `/assets/s3/centre-medallion.png` | 2048 x 2048 (1:1 square) | Central sun medallion with "weds" and twin fish (Matsya) motifs. |
| `bgTile` | `/assets/s3/bg-tile.png` | 2048 x 2048 (seamless tile) | Traditional Madhubani repeat pattern tiled over royal emerald background. |
| `toranStrand` | `/assets/s3/toran-strand.png` | ~120 x 480 (vertical strip) | Hanging marigold flower and mango leaf garland strand. |
| `portraitBride` | `/assets/s3/portrait-bride.png` | 600 x 800 (or square/portrait) | Bride photo (if null, displays initials monogram). |
| `portraitGroom` | `/assets/s3/portrait-groom.png` | 600 x 800 (or square/portrait) | Groom photo (if null, displays initials monogram). |
| `petals.lotus` | `/assets/s3/petals/lotus-1.png`, `lotus-2.png` | 64 x 64 transparent PNG | Petal sprites released on Bride "Send Blessings" click. |
| `petals.marigold` | `/assets/s3/petals/marigold-1.png`, `marigold-2.png` | 64 x 64 transparent PNG | Petal sprites released on Groom "Salute Brad" click. |
| `icons.lotus` | `/assets/s3/icons/lotus.png` | 48 x 48 transparent PNG | Superpower stat row icon. |
| `icons.fish` | `/assets/s3/icons/fish.png` | 48 x 48 transparent PNG | Weakness stat row icon. |
| `icons.sun` | `/assets/s3/icons/sun.png` | 48 x 48 transparent PNG | Verdict stat row icon. |
| `icons.conch` | `/assets/s3/icons/conch.png` | 48 x 48 transparent PNG | Groom button icon. |
| `icons.diya` | `/assets/s3/icons/diya.png` | 48 x 48 transparent PNG | Optional auspicious lamp icon. |
| `icons.feather` | `/assets/s3/icons/feather.png` | 48 x 48 transparent PNG | Optional peacock feather icon. |

## Phase 1 vs Phase 2 Behavior

- **Phase 1 (Default)**: Any asset set to `null` (or empty array) automatically renders high-fidelity vector SVG / CSS placeholders in the Madhubani folk-art style with authentic color palette (`--red: #b3141c`, `--gold: #b8862b`, `--ink: #1b1210`, `--cream: #f7e8c4`, `--cream-card: #fff8e7`, `--text: #2b1418`).
- **Phase 2 (Drop-in)**: Simply replace `null` with the asset path (e.g. `archFrame: '/assets/s3/arch-frame.png'`). The component will seamlessly transition to using the artwork without modifying any layout or interaction code.
