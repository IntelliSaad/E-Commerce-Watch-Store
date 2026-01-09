const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
// Fix: Use node-fetch for older node versions if needed, but modern node has fetch.
// We use a dynamic import approach or global fetch.

dotenv.config();

async function listModels() {
  console.log("Fetching available models from API...");

  let fetchFn = global.fetch;
  if (!fetchFn) {
    try {
      fetchFn = (await import('node-fetch')).default;
    } catch (e) {
      console.error("Could not load fetch:", e);
      return;
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;

  try {
    const response = await fetchFn(url);
    const data = await response.json();

    if (data.models) {
      const fs = require('fs');
      const path = require('path');
      fs.writeFileSync(path.join(__dirname, 'models.json'), JSON.stringify(data.models, null, 2));
      console.log("✅ Saved available models to models.json");
    } else {
      console.log("❌ Failed to list models:", JSON.stringify(data, null, 2));
      if (data.error) {
        console.log("Error details:", data.error.message);
      }
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

listModels();
