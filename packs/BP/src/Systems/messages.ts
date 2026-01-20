import { Player } from "@minecraft/server"

export const messageManager = new (class messageManager {
    sendSuccessfulMessage(player: Player, message: string, prefix: boolean = true) {
        player.sendMessage(`${prefix ? "§6[§4BLQZED§6]§r " : ""}§a${message}`)
    }

    sendUnsuccessfulMessage(player: Player, message: string, prefix: boolean = true) {
        player.sendMessage(`${prefix ? "§6[§4BLQZED§6]§r " : ""}§m${message}`)
    }
})