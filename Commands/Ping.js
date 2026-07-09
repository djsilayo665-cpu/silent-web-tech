module.exports = {
    name: "ping",
    aliases: ["speed"],

    async execute(sock, msg, args) {

        const start = Date.now();

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: `🏓 Pong!\n\nSpeed: ${Date.now() - start}ms`
            },
            { quoted: msg }
        );
    }
};
