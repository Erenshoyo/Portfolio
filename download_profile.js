import fs from "fs";
import https from "https";

async function run() {
  try {
    const res = await fetch("https://ibb.co.com/0pHZhXZb");
    const html = await res.text();
    const match = html.match(/og:image" content="([^"]+)"/);
    if (!match) {
      console.log("Image URL not found.");
      return;
    }
    const imgUrl = match[1];
    console.log("Downloading", imgUrl);

    const file = fs.createWriteStream("./public/profile.png");
    https.get(imgUrl, function(response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Downloaded as profile.png");
      });
    }).on("error", (err) => {
      fs.unlink("./public/profile.png", () => {});
      console.log("Error:", err.message);
    });
  } catch (err) {
    console.log("Error:", err);
  }
}
run();
