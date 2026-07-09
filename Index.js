const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const readline = require("readline");
const { Boom } = require("@hapi/boom");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["Silent DJ Bot", "Chrome", "1.0.0"],
  });

  if (!sock.authState.creds.registered) {
    rl.question("Enter your phone number (with country code): ", async (number) => {
      try {
        const code = await sock.requestPairingCode(number);
        console.log("\n==========================");
        console.log("Your Pairing Code:");
        console.log(code);
        console.log("==========================\n");
      } catch (err) {
        console.log("Failed to generate pairing code:", err.message);
      }
    });
  }

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("✅ Silent DJ Bot Connected!");
    }

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error instanceof Boom
          ? lastDisconnect.error.output.statusCode
          : 0) !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        console.log("🔄 Reconnecting...");
        startBot();
      } else {
        console.log("❌ Logged out.");
      }
    }
  });

  // Load command handler
  require("./handler")(sock);
}

startBot();
