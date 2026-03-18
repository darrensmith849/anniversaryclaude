# Hero Reel Source TODO

The files in this folder are temporary local placeholders generated in-repo because Pexels downloads were blocked in this environment by Cloudflare challenge pages.

Expected replacement files (same filenames):
- `hero-01-kruger.mp4` from: https://www.pexels.com/video/wildlife-safari-at-kruger-national-park-30018137/
- `hero-02-cape-town.mp4` from: https://www.pexels.com/video/clifton-camps-bay-and-table-mountain-17916042/
- `hero-03-winelands.mp4` from: https://www.pexels.com/video/winelands-during-sunset-in-south-africa-20535718/
- `hero-04-hotel.mp4` from: https://www.pexels.com/video/shot-of-a-hotel-room-with-an-open-door-7507165/

Optimization target (when replacing):
- duration 6-10s
- muted/no audio track
- max 1080p
- H.264 MP4
- target size 3-10MB each

Suggested ffmpeg command:

```bash
ffmpeg -i input.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 28 -preset veryfast -an output.mp4
```

Matching posters are expected in `/public/images/hero/`.
