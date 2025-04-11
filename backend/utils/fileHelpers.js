// backend/utils/fileHelpers.js
const fs = require("fs-extra");

const readJSON = async (filePath) => {
  try {
    const exists = await fs.pathExists(filePath);
    if (!exists) await fs.writeJson(filePath, []);
    const data = await fs.readJson(filePath);
    return data;
  } catch (err) {
    console.error("Read error:", err);
    return [];
  }
};

const writeJSON = async (filePath, data) => {
  try {
    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (err) {
    console.error("Write error:", err);
  }
};

module.exports = { readJSON, writeJSON };
