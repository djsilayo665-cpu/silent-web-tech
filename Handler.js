const fs = require("fs");
const path = require("path");

const commands = new Map();

// Load all commands
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  if (command.name && command.execute) {
    commands.set(command.name.toLowerCase(), command);

    if (command.aliases) {
      command.aliases.forEach(alias => {
        commands.set(alias.toLowerCase(), command);
      });
    }

    console.log(`✅ Loaded command: ${command.name}`);
  }
}

// Message handler
async function handler(sock, msg) {
  try {
    if (!msg.message) return;

    const from = msg.key.remoteJid;

    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      msg.message.videoMessage?.caption ||
      "";

    const prefix = ".";

    if (!body.startsWith(prefix)) return;

    const args = body
      .slice(prefix.length)
      .trim()
      .split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);

    if (!command) return;

    await command.execute(sock, msg, args);

  } catch (err) {
    console.log("Handler Error:", err);
  }
}

module.exports = handler;
