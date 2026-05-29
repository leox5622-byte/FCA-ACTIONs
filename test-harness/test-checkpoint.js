"use strict";
const fs = require("fs");
const path = require("path");
const { login } = require("@neoaz07/nkxfca");

const appState = JSON.parse(fs.readFileSync(
  path.join(__dirname, "appstate.json"), "utf8"
));

login({ appState }, { online: true, listenEvents: false }, async (err, api) => {
  if (err) { console.error("LOGIN ERROR:", err); process.exit(1); }

  // Test getUserID
  console.log("Testing getUserID...");
  try {
    const res = await api.getUserID("Ashfakur Rahman Leon");
    console.log("✅ getUserID:", JSON.stringify(res).substring(0, 300));
  } catch (e) {
    console.log("❌ getUserID:", e.message?.substring(0, 200) || String(e).substring(0, 200));
  }

  // Test resolvePhotoUrl with a known photo ID
  console.log("\nTesting resolvePhotoUrl...");
  try {
    const res = await api.resolvePhotoUrl("61586059919455");
    console.log("✅ resolvePhotoUrl:", JSON.stringify(res).substring(0, 200));
  } catch (e) {
    console.log("❌ resolvePhotoUrl:", e.message?.substring(0, 200) || String(e).substring(0, 200));
  }

  process.exit(0);
});
