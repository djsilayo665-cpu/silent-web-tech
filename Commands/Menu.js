module.exports = {
    name: "menu",
    aliases: ["help", "cmd"],
    
    async execute(sock, msg, args) {

        const menu = `
╭━━━〔 🤖 SILENT DJ BOT 〕━━━╮

👑 Owner Commands
• .menu
• .ping
• .alive
• .runtime

🎵 Music Commands
• .song
• .play
• .ytmp3
• .ytmp4

👥 Group Commands
• .groupstatus
• .tagall
• .hidetag
• .kick
• .promote
• .demote

🛠 Tools
• .sticker
• .toimg
• .translate
• .weather

📥 Download
• .tiktok
• .instagram
• .facebook

╰━━━━━━━━━━━━━━━━━━╯

⚡ Silent DJ Bot
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            { text: menu },
            { quoted: msg }
        );
    }
};
