require("dotenv").config();
const axios = require("axios");
const faker = require('@faker-js/faker');
const apiKey = process.env.APIKEY;

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
  "JavaScript",
  "Solidity",
  "C",
  "Python",
  "Java",
  "Dart",
  "TypeScript",
  ".eu-outhack",
];

const projects = [
  "Kampus-Haven-api",
  "Custom Content Management System",
  "public-apis",
  "okoa-sem",
  "past-paper-api",
];


async function sendHeartbeat() {
  const currentTime = Math.floor(Date.now() / 1000);
  const entity = faker.helpers.arrayElement(files);
  const language = faker.helpers.arrayElement(languages);
  const project = faker.helpers.arrayElement(projects);
  const isWrite = faker.datatype.boolean();

  const data = {
    time: currentTime,
    entity: entity,
    type: "file",
    category: isWrite ? "coding" : "reviewing",
    is_write: isWrite,
    language: language,
    project: project,
  };

  try {
    const response = await axios.post(
      "https://api.wakatime.com/api/v1/users/current/heartbeats",
      data,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
      }
    );
    console.log(
      `Heartbeat sent for ${entity} (Project: ${project}) at ${new Date(
        currentTime * 1000
      ).toLocaleString()} - Status: ${response.status}`
    );
  } catch (error) {
    console.error("Error sending heartbeat:", error.message);
  }
}

// Random interval between 50 and 70 seconds
const getRandomInterval = () =>
  Math.floor(Math.random() * (70000 - 50000) + 50000);
setInterval(sendHeartbeat, getRandomInterval());
