import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public/images", { recursive: true });
const source = "assets/bureau-v3.png";
const metadata = await sharp(source).metadata();
if (metadata.width !== 1672 || metadata.height !== 941) throw new Error("Unexpected bureau v3 dimensions");
const image = await sharp(source)
  .webp({ quality: 94, effort: 6, smartSubsample: true })
  .toFile("public/images/atelier-v3.webp");
console.log(`Bureau v3 optimisé : ${image.width} × ${image.height}, ${image.size} octets.`);
