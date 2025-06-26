// commands/autoreact.js
const { handleAreactCommand } = require('../lib/reaction');

module.exports = {
    command: '.autoreact', // کمانڈ ٹرگر
    desc: 'Auto-reaction on/off', // تفصیل
    handler: async (sock, m, text, isOwner) => {
        await handleAreactCommand(sock, m, isOwner);
    }
};
