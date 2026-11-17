import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public/images", { recursive: true });
const image = await sharp("assets/bureau.png")
  .webp({ quality: 90, effort: 6 })
  .toFile("public/images/atelier.webp");
console.log(`Décor optimisé : ${image.width} × ${image.height}, ${image.size} octets.`);
