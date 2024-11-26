const ENVIRONMENT = getEnvironment();
const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const APP_URL = process.env.APP_URL;

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = {
  PORT,
  MONGO_URL,
  SECRET,
  APP_URL,
  ENVIRONMENT,
  // GITHUB_TOKEN,
};

function getEnvironment() {
  return process.env.ENVIRONMENT || "development";
}
