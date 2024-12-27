# Wakatime Automator

This project is an automated script to send fake heartbeats to the Wakatime API, simulating work done on coding projects. It uses Node.js, Axios, and the Faker library to generate random data and send it to the Wakatime API at regular intervals.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scheduled Execution](#scheduled-execution)
- [License](#license)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: This project requires Node.js (v14 or above). Download it from [here](https://nodejs.org/en/).
- **Wakatime API Key**: You'll need a Wakatime API key to authenticate the script. You can get it from your [Wakatime account](https://wakatime.com/settings).

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/lxmwaniky/wakatime-automator.git
cd wakatime-automator
```

### 2. Install dependencies

```bash
npm install
```

## Usage

1. Setup environment variables
Create a `.env` file in the root directory of the project and add your Wakatime API key as shown below:

```bash
API_KEY=your-wakatime-api-key
```

2. Run the script

```bash
npm run dev
```

The script will send a heartbeat every minute to the Wakatime API, simulating activity on coding projects.

## Configuration

You can modify the following parameters in the `src/index.js` file:
- `files`: List of files that will be simulated for coding activity.
- `languages`: List of programming languages for the heartbeats.
- `projects`: List of projects that will be randomly assigned.
- `interval`: The script sends heartbeats every minute (60 * 1000 milliseconds).

If you'd like to simulate different types of activities or use other files, languages, or projects, modify the arrays accordingly.