module.exports = {
    name: "group",
    alias: [
        "tagall",
        "hidetag",
        "kick",
        "promote",
        "demote",
        "linkgc",
        "groupstatus"
    ],

    category: "group",

    async execute(sock, msg, args) {
        const from = msg.key.remoteJid;

        if (!from.endsWith("@g.us")) {
            return sock.sendMessage(from, {
                text: "❌ This command works only in groups."
            });
        }

        const command = args[0]?.toLowerCase();

        switch (command) {

            case "tagall":
                {
                    const metadata = await sock.groupMetadata(from);
                    const members = metadata.participants;

                    let text = "📢 *TAG ALL MEMBERS*\n\n";

                    members.forEach(member => {
                        text += `@${member.id.split("@")[0]}\n`;
                    });

                    await sock.sendMessage(from, {
                        text,
                        mentions: members.map(m => m.id)
                    });
                }
                break;


            case "groupstatus":
                {
                    const metadata = await sock.groupMetadata(from);

                    await sock.sendMessage(from, {
                        text:
`👥 *GROUP INFO*

📌 Name: ${metadata.subject}
👤 Members: ${metadata.participants.length}
🆔 ID: ${from}`
                    });
                }
                break;


            case "linkgc":
                {
                    const code = await sock.groupInviteCode(from);

                    await sock.sendMessage(from, {
                        text: `🔗 Group Link:\nhttps://chat.whatsapp.com/${code}`
                    });
                }
                break;


            default:
                await sock.sendMessage(from, {
                    text:
`Group Commands:

.tagall
.groupstatus
.linkgc

More group commands coming...`
                });
        }
    }
};
