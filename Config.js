require("dotenv").config();

module.exports = {
  // Bot Settings
  BOT_NAME: process.env.BOT_NAME || "Silent DJ Bot",
  OWNER_NAME: process.env.OWNER_NAME || "Dj Silayo",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255700000000",

  // Railway / Server
  PORT: process.env.PORT || 3000,

  // Session
  SESSION_ID: process.env.SESSION_ID || "",

  // Telegram Pairing Bot
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || "",

  // Prefix
  PREFIX: process.env.PREFIX || ".",

  // Mode
  PUBLIC_MODE: process.env.PUBLIC_MODE === "true",

  // Timezone
  TIMEZONE: "Africa/Dar_es_Salaam",
};
