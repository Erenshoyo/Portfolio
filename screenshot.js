import fs from "fs";
import puppeteer from "puppeteer";

const projects = [
  { url: "https://pulsecity-event-explorer.web.app", name: "pulse" },
  { url: "https://phudu-medical.web.app", name: "phudu" },
  { url: "https://dragon-news-site-241.web.app", name: "dragon" },
];

(async () => {
  if (!fs.existsSync("./public/projects")) {
    fs.mkdirSync("./public/projects", { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  for (const project of projects) {
    console.log(`Taking screenshot for ${project.name}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    try {
      await page.goto(project.url, { waitUntil: "networkidle2", timeout: 30000 });
      // Give it a small extra wait for any initial animations or image loads
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: `./public/projects/${project.name}.png` });
      console.log(`✅ Saved ${project.name}.png`);
    } catch (err) {
      console.error(`❌ Failed to screenshot ${project.name}:`, err);
    }
    
    await page.close();
  }
  await browser.close();
})();
