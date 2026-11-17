const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const vid1 = "C:/Users/RESHMA/.gemini/antigravity/brain/b6be79bb-b49c-4aba-adbc-1c118170580e/.user_uploaded/media_1793618778392_51af3e9c.mp4";
const vid2 = "C:/Users/RESHMA/.gemini/antigravity/brain/b6be79bb-b49c-4aba-adbc-1c118170580e/.user_uploaded/media_1793618778423_33f054eb.mp4";

fs.mkdirSync('./public/ref-frames', { recursive: true });

try {
  execSync(`"${ffmpeg}" -i "${vid1}" -vf fps=1 -vframes 12 ./public/ref-frames/v1_%02d.jpg`, { stdio: 'inherit' });
  execSync(`"${ffmpeg}" -i "${vid2}" -vf fps=1 -vframes 12 ./public/ref-frames/v2_%02d.jpg`, { stdio: 'inherit' });
  console.log("Frames extracted successfully!");
} catch (e) {
  console.error(e);
}

