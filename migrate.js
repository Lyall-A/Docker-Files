const fs = require("fs");
const path = require("path");

for (const file of fs.readdirSync("./")) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const oldDir = "./OLD";
    const newdir = `./Services/${base}`;

    if (ext !== ".yml") continue;
    
    fs.mkdirSync(newdir, { recursive: true }); // Make new dir
    fs.mkdirSync(oldDir, { recursive: true }); // Make old dir
    fs.renameSync(file, `${oldDir}/${file}`); // Move to old dir
    fs.writeFileSync(`${newdir}/docker-compose.yml`, fs.readFileSync(`${oldDir}/${file}`, "utf-8").replace(/-\s*\.\/Volumes/g, "- ../../Volumes").replace(/dockerfile: .*\.Dockerfile/g, "dockerfile: Dockerfile")); // Copy docker compose to new dir
    if (fs.existsSync(`${base}.Dockerfile`)) {
        fs.renameSync(`${base}.Dockerfile`, `${oldDir}/${base}.Dockerfile`); // Move dockerfile to old dir
        fs.cpSync(`${oldDir}/${base}.Dockerfile`, `${newdir}/Dockerfile`); // Copy dockerfile to new dir
    }
}