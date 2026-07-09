const config = require("./config");

module.exports = {
  help: {
    name: "help",
    description: "Show all available commands",
    run: async (sock, m) => {
      let text = `
╭───〔 ${config.BOT_NAME} 〕───
│
│ 👤 User Commands
│ • .menu
│ • .ping
│ • .runtime
│ • .owner
│ • .sticker
│ • .song
│ • .play
│ • .ytmp3
│ • .ytmp4
│
│ 👥 Group Commands
│ • .groupopen
│ • .groupclose
│ • .kick
│ • .add
│ • .promote
│ • .demote
│ • .tagall
│ • .hidetag
│ • .groupstatus
│
│ ⚙️ Bot Commands
│ • .alive
│ • .restart
│ • .update
│ • .settings
│
╰──────────────
      `;

      await sock.sendMessage(m.chat, { text });
    }
  },

  ping: {
    name: "ping",
    description: "Check bot speed",
    run: async (sock, m) => {
      await sock.sendMessage(m.chat, {
        text: "🏓 Pong!"
      });
    }
  },

  alive: {
    name: "alive",
    description: "Check bot status",
    run: async (sock, m) => {
      await sock.sendMessage(m.chat, {
        text: `✅ ${config.BOT_NAME} is online`
      });
    }
  },

  owner: {
    name: "owner",
    description: "Show owner info",
    run: async (sock, m) => {
      await sock.sendMessage(m.chat, {
        text: `👑 Owner: ${config.OWNER_NAME}\n📱 ${config.OWNER_NUMBER}`
      });
    }
  }
};
