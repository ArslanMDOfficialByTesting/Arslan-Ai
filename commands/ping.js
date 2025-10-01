const os = require('os');
const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        // Auto reaction
        await sock.sendMessage(chatId, { react: { text: "⚡", key: message.key } });

        const start = Date.now();
        await sock.sendMessage(chatId, { text: 'Testing speed... ⏳' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeFormatted = formatTime(process.uptime());
        const platform = os.type() + " " + os.arch();
        const ram = (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB";

        const botInfo = `
╭━━━〔 🤖 ${settings.botName || "Arslan-Ai"} 〕━━━╮
│ ⚡ *Ping*     : ${ping} ms
│ ⏱️ *Uptime*   : ${uptimeFormatted}
│ 💻 *Platform* : ${platform}
│ 🖥️ *RAM*      : ${ram}
│ 🔖 *Version*  : v${settings.version}
╰━━━━━━━━━━━━━━━━━━━╯
        `.trim();

        // Send final styled message
        await sock.sendMessage(chatId, { text: botInfo }, { quoted: message });

    } catch (error) {
        console.error('❌ Ping Command Error:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to get bot status. Please try again later.' }, { quoted: message });
    }
}

module.exports = pingCommand;
