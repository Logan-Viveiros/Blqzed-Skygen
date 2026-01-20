export const messageManager = new (class messageManager {
    sendSuccessfulMessage(player, message, prefix = true) {
        player.sendMessage(`${prefix ? "§6[§4BLQZED§6]§r " : ""}§a${message}`);
    }
    sendUnsuccessfulMessage(player, message, prefix = true) {
        player.sendMessage(`${prefix ? "§6[§4BLQZED§6]§r " : ""}§m${message}`);
    }
});
