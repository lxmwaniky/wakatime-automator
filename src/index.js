const axios = require("axios");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const apiKey = process.env.API_KEY;
const apiUrl = "https://api.wakatime.com/api/v1/users/current/heartbeats";

if (!apiKey) {
  console.error("API key is missing. Please set the APIKEY in your .env file.");
  process.exit(1);
}

const files = [
  "/src/server.js",
  "/src/middleware/auth.js",
  "/src/models/User.js",
  "/prisma/schema.prisma",
  "/src/config/settings.json",
  "/tests/unit/app.test.js",
  "/tests/integration/app.test.js",
  "/Dockerfile",
  "/package.json",
  "Docker-compose.yaml",
];

const languages = [
  "TypeScript",
  "JavaScript",
  "Docker",
  "Prisma",
  "JSON",
  "Bash",
];

const projects = [
  "Kampus-Haven-api",
  "Custom Content Management System",
  "public-apis",
  "okoa-sem",
  "past-paper-api",
];

const editors = ["VS Code"];

async function sendHeartbeat() {
  const currentTime = Math.floor(Date.now() / 1000);
  const entity = faker.helpers.arrayElement(files);
  const language = faker.helpers.arrayElement(languages);
  const project = faker.helpers.arrayElement(projects);
  const isWrite = faker.datatype.boolean();
  const editor = faker.helpers.arrayElement(editors);

  const data = {
    time: currentTime,
    entity: entity,
    type: "file",
    category: isWrite ? "coding" : "reviewing",
    is_write: isWrite,
    language: language,
    project: project,
    editor: editor,
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
      timeout: 10000,
      maxRedirects: 5,
    });
    console.log(
      `Heartbeat sent for ${entity} in project ${project} at ${currentTime}`
    );
  } catch (error) {
    console.error("Error sending heartbeat:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      if (
        error.response.data.skip &&
        error.response.data.skip === "Too many duplicate heartbeats."
      ) {
        console.log(
          "Duplicate heartbeat detected. Retrying after 2 minutes..."
        );
      }
    }
  }
}

setTimeout(() => {
  sendHeartbeat();
  setInterval(sendHeartbeat, 120000);
}, 0);
