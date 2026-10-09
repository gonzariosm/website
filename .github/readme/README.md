# README assets

`demo.gif` is a screen recording of the site (English, desktop, light mode) shown in the main README. It is not part of the deployed site.

To refresh it, record a tour with Playwright (`recordVideo`, 1280×800), then convert:

```bash
ffmpeg -ss 0.4 -i tour.webm -vf "setpts=PTS/2.4,fps=8,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 demo.gif
```

Keep it under ~6 MB so the README loads quickly. It shows personal content (avatar, texts), which is covered by LICENSE-CONTENT.
