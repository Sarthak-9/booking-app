import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

const EVENT_CONFIG = {
  startHour: "10:00:00.000",
  endHour: "17:00:00.000",
  duration: 30,
  timezone: "UTC",
};

const COLLECTIONS = {
  events: "events",
};

export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  },
  eventConfig: EVENT_CONFIG,
  collections: COLLECTIONS,
};
