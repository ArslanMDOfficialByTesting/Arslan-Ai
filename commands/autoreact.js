// commands/index.js
const fs = require('fs');
const path = require('path');

const commands = {};
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        const cmd = require(path.join(__dirname, file));
        commands[cmd.command] = cmd.handler;
    }
});

module.exports = commands;
